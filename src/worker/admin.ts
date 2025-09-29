import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { sign, verify } from "hono/jwt";
import { getCookie, setCookie } from "hono/cookie";

type Env = {
  DB: D1Database;
  ADMIN_JWT_SECRET: string;
};

type Variables = {
  admin: any;
  token: string;
};

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

// Middleware for admin authentication
const adminAuth = async (c: any, next: any) => {
  const token = getCookie(c, 'admin_token') || c.req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const payload = await verify(token, c.env.ADMIN_JWT_SECRET) as any;
    const session = await c.env.DB.prepare(
      "SELECT * FROM admin_sessions WHERE token = ? AND expires_at > datetime('now')"
    ).bind(token).first();
    
    if (!session) {
      return c.json({ error: 'Invalid or expired session' }, 401);
    }

    const admin = await c.env.DB.prepare(
      "SELECT * FROM admin_users WHERE id = ? AND is_active = TRUE"
    ).bind(payload.admin_id).first();
    
    if (!admin) {
      return c.json({ error: 'Admin not found' }, 401);
    }

    c.set('admin', admin);
    c.set('token', token);
    await next();
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401);
  }
};

// Helper function to log activities
const logActivity = async (db: D1Database, data: {
  user_id?: number;
  admin_id?: number;
  entity_type: string;
  entity_id: number;
  action: string;
  details?: any;
  ip_address?: string;
  user_agent?: string;
}) => {
  await db.prepare(`
    INSERT INTO activity_logs (user_id, admin_id, entity_type, entity_id, action, details, ip_address, user_agent, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `).bind(
    data.user_id || null,
    data.admin_id || null,
    data.entity_type,
    data.entity_id,
    data.action,
    data.details ? JSON.stringify(data.details) : null,
    data.ip_address || null,
    data.user_agent || null
  ).run();
};

// Admin Authentication
app.post("/api/admin/login",
  zValidator("json", z.object({
    email: z.string().email(),
    password: z.string(),
  })),
  async (c) => {
    const { email, password } = c.req.valid("json");
    const db = c.env.DB;
    
    // In production, use proper password hashing (bcrypt)
    const admin = await db.prepare(
      "SELECT * FROM admin_users WHERE email = ? AND is_active = TRUE"
    ).bind(email).first();
    
    if (!admin || admin.password_hash !== password) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Create JWT token
    const token = await sign(
      { admin_id: admin.id, email: admin.email, exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) },
      c.env.ADMIN_JWT_SECRET
    );

    // Store session
    await db.prepare(`
      INSERT INTO admin_sessions (admin_id, token, expires_at, created_at)
      VALUES (?, ?, datetime('now', '+24 hours'), datetime('now'))
    `).bind(admin.id, token).run();

    // Update last login
    await db.prepare(
      "UPDATE admin_users SET last_login = datetime('now') WHERE id = ?"
    ).bind(admin.id).run();

    setCookie(c, 'admin_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return c.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
      token
    });
  }
);

app.post("/api/admin/logout", adminAuth, async (c) => {
  const token = c.get('token') as string;
  const db = c.env.DB;
  
  await db.prepare("DELETE FROM admin_sessions WHERE token = ?").bind(token).run();
  
  setCookie(c, 'admin_token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 0,
  });

  return c.json({ success: true });
});

// Dashboard Analytics
app.get("/api/admin/dashboard", adminAuth, async (c) => {
  const db = c.env.DB;
  
  const [users, parcels, trips, transactions] = await Promise.all([
    db.prepare("SELECT COUNT(*) as count FROM users").first(),
    db.prepare("SELECT COUNT(*) as count, status FROM parcels GROUP BY status").all(),
    db.prepare("SELECT COUNT(*) as count, status FROM trips GROUP BY status").all(),
    db.prepare("SELECT COUNT(*) as count, SUM(amount_euros) as total_revenue FROM transactions WHERE payment_status = 'completed'").first(),
  ]);

  const recentActivity = await db.prepare(`
    SELECT * FROM activity_logs 
    ORDER BY created_at DESC 
    LIMIT 20
  `).all();

  return c.json({
    stats: {
      total_users: users?.count || 0,
      parcels: parcels.results,
      trips: trips.results,
      revenue: transactions?.total_revenue || 0,
      total_transactions: transactions?.count || 0,
    },
    recent_activity: recentActivity.results
  });
});

// User Management
app.get("/api/admin/users", adminAuth, async (c) => {
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '20');
  const search = c.req.query('search') || '';
  const offset = (page - 1) * limit;
  
  const db = c.env.DB;
  
  let query = "SELECT * FROM users WHERE 1=1";
  let countQuery = "SELECT COUNT(*) as count FROM users WHERE 1=1";
  const binds = [];
  
  if (search) {
    query += " AND (email LIKE ? OR name LIKE ? OR phone LIKE ?)";
    countQuery += " AND (email LIKE ? OR name LIKE ? OR phone LIKE ?)";
    const searchPattern = `%${search}%`;
    binds.push(searchPattern, searchPattern, searchPattern);
  }
  
  query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
  
  const [users, count] = await Promise.all([
    db.prepare(query).bind(...binds, limit, offset).all(),
    db.prepare(countQuery).bind(...binds).first(),
  ]);
  
  const totalCount = (count as any)?.count || 0;
  
  return c.json({
    users: users.results,
    pagination: {
      page,
      limit,
      total: totalCount,
      pages: Math.ceil(totalCount / limit)
    }
  });
});

app.get("/api/admin/users/:id", adminAuth, async (c) => {
  const userId = c.req.param("id");
  const db = c.env.DB;
  
  const [user, parcels, trips] = await Promise.all([
    db.prepare("SELECT * FROM users WHERE id = ?").bind(userId).first(),
    db.prepare("SELECT * FROM parcels WHERE sender_id = ? ORDER BY created_at DESC").bind(userId).all(),
    db.prepare("SELECT * FROM trips WHERE traveler_id = ? ORDER BY created_at DESC").bind(userId).all(),
  ]);
  
  if (!user) {
    return c.json({ error: 'User not found' }, 404);
  }
  
  return c.json({
    user,
    parcels: parcels.results,
    trips: trips.results
  });
});

app.put("/api/admin/users/:id",
  adminAuth,
  zValidator("json", z.object({
    verified: z.boolean().optional(),
    user_type: z.enum(['sender', 'traveler', 'both']).optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
  })),
  async (c) => {
    const userId = c.req.param("id");
    const updates = c.req.valid("json");
    const admin = c.get('admin') as any;
    const db = c.env.DB;
    
    const setClauses = [];
    const binds = [];
    
    Object.entries(updates).forEach(([key, value]) => {
      setClauses.push(`${key} = ?`);
      binds.push(value);
    });
    
    if (setClauses.length === 0) {
      return c.json({ error: 'No updates provided' }, 400);
    }
    
    setClauses.push('updated_at = datetime("now")');
    binds.push(userId);
    
    await db.prepare(`
      UPDATE users SET ${setClauses.join(', ')} WHERE id = ?
    `).bind(...binds).run();
    
    await logActivity(db, {
      admin_id: admin.id,
      entity_type: 'user',
      entity_id: parseInt(userId),
      action: 'updated',
      details: updates,
    });
    
    return c.json({ success: true });
  }
);

// Parcel Management
app.get("/api/admin/parcels", adminAuth, async (c) => {
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '20');
  const status = c.req.query('status') || '';
  const offset = (page - 1) * limit;
  
  const db = c.env.DB;
  
  let query = `
    SELECT p.*, u.name as sender_name, u.email as sender_email,
           t.traveler_id, tu.name as traveler_name, tu.email as traveler_email
    FROM parcels p
    LEFT JOIN users u ON p.sender_id = u.id
    LEFT JOIN trips t ON p.trip_id = t.id
    LEFT JOIN users tu ON t.traveler_id = tu.id
    WHERE 1=1
  `;
  let countQuery = "SELECT COUNT(*) as count FROM parcels WHERE 1=1";
  const binds = [];
  
  if (status) {
    query += " AND p.status = ?";
    countQuery += " AND status = ?";
    binds.push(status);
  }
  
  query += " ORDER BY p.created_at DESC LIMIT ? OFFSET ?";
  
  const [parcels, count] = await Promise.all([
    db.prepare(query).bind(...binds, limit, offset).all(),
    db.prepare(countQuery).bind(...binds).first(),
  ]);
  
  const totalCount = (count as any)?.count || 0;
  
  return c.json({
    parcels: parcels.results,
    pagination: {
      page,
      limit,
      total: totalCount,
      pages: Math.ceil(totalCount / limit)
    }
  });
});

app.put("/api/admin/parcels/:id/status",
  adminAuth,
  zValidator("json", z.object({
    status: z.enum(['created', 'matched', 'picked_up', 'in_transit', 'delivered']),
    notes: z.string().optional(),
  })),
  async (c) => {
    const parcelId = c.req.param("id");
    const { status, notes } = c.req.valid("json");
    const admin = c.get('admin') as any;
    const db = c.env.DB;
    
    const oldParcel = await db.prepare("SELECT * FROM parcels WHERE id = ?").bind(parcelId).first() as any;
    
    if (!oldParcel) {
      return c.json({ error: 'Parcel not found' }, 404);
    }
    
    await db.prepare(`
      UPDATE parcels 
      SET status = ?, updated_at = datetime('now')
      WHERE id = ?
    `).bind(status, parcelId).run();
    
    // Add tracking update
    await db.prepare(`
      INSERT INTO tracking_updates (parcel_id, status, description, updated_by_admin_id, created_at)
      VALUES (?, ?, ?, ?, datetime('now'))
    `).bind(
      parcelId,
      status,
      notes || `Status updated to ${status} by admin`,
      admin.id
    ).run();
    
    await logActivity(db, {
      admin_id: admin?.id,
      entity_type: 'parcel',
      entity_id: parseInt(parcelId),
      action: 'status_changed',
      details: { old_status: oldParcel?.status, new_status: status, notes },
    });
    
    return c.json({ success: true });
  }
);

// Chat Management
app.get("/api/admin/chats", adminAuth, async (c) => {
  const db = c.env.DB;
  
  const conversations = await db.prepare(`
    SELECT 
      conversation_id,
      MAX(created_at) as last_message_at,
      COUNT(*) as message_count,
      SUM(CASE WHEN is_read = FALSE AND recipient_type = 'admin' THEN 1 ELSE 0 END) as unread_count,
      (SELECT sender_id FROM chat_messages WHERE conversation_id = cm.conversation_id AND sender_type = 'user' LIMIT 1) as user_id,
      (SELECT message FROM chat_messages WHERE conversation_id = cm.conversation_id ORDER BY created_at DESC LIMIT 1) as last_message
    FROM chat_messages cm
    GROUP BY conversation_id
    ORDER BY last_message_at DESC
  `).all();
  
  // Get user info for each conversation
  const conversationsWithUsers = await Promise.all(
    conversations.results.map(async (conv: any) => {
      const user = await db.prepare("SELECT name, email FROM users WHERE id = ?").bind(conv.user_id).first();
      return { ...conv, user };
    })
  );
  
  return c.json({ conversations: conversationsWithUsers });
});

app.get("/api/admin/chats/:conversationId", adminAuth, async (c) => {
  const conversationId = c.req.param("conversationId");
  const db = c.env.DB;
  
  const messages = await db.prepare(`
    SELECT cm.*, u.name as sender_name
    FROM chat_messages cm
    LEFT JOIN users u ON cm.sender_id = u.id AND cm.sender_type = 'user'
    WHERE conversation_id = ?
    ORDER BY created_at ASC
  `).bind(conversationId).all();
  
  // Mark admin messages as read
  await db.prepare(`
    UPDATE chat_messages 
    SET is_read = TRUE 
    WHERE conversation_id = ? AND recipient_type = 'admin'
  `).bind(conversationId).run();
  
  return c.json({ messages: messages.results });
});

app.post("/api/admin/chats/:conversationId/message",
  adminAuth,
  zValidator("json", z.object({
    message: z.string(),
    user_id: z.number(),
  })),
  async (c) => {
    const conversationId = c.req.param("conversationId");
    const { message, user_id } = c.req.valid("json");
    const admin = c.get('admin') as any;
    const db = c.env.DB;
    
    await db.prepare(`
      INSERT INTO chat_messages (conversation_id, sender_type, sender_id, recipient_type, recipient_id, message, created_at)
      VALUES (?, 'admin', ?, 'user', ?, ?, datetime('now'))
    `).bind(conversationId, admin.id, user_id, message).run();
    
    await logActivity(db, {
      admin_id: admin?.id,
      entity_type: 'chat',
      entity_id: user_id,
      action: 'message_sent',
      details: { conversation_id: conversationId, message },
    });
    
    return c.json({ success: true });
  }
);

// Tracking Updates
app.get("/api/admin/tracking/:parcelId", adminAuth, async (c) => {
  const parcelId = c.req.param("parcelId");
  const db = c.env.DB;
  
  const tracking = await db.prepare(`
    SELECT tu.*, 
           au.name as admin_name,
           u.name as user_name
    FROM tracking_updates tu
    LEFT JOIN admin_users au ON tu.updated_by_admin_id = au.id
    LEFT JOIN users u ON tu.updated_by_user_id = u.id
    WHERE parcel_id = ?
    ORDER BY created_at DESC
  `).bind(parcelId).all();
  
  return c.json({ tracking: tracking.results });
});

app.post("/api/admin/tracking/:parcelId/update",
  adminAuth,
  zValidator("json", z.object({
    status: z.string(),
    location: z.string().optional(),
    description: z.string(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  })),
  async (c) => {
    const parcelId = c.req.param("parcelId");
    const { status, location, description, latitude, longitude } = c.req.valid("json");
    const admin = c.get('admin') as any;
    const db = c.env.DB;
    
    await db.prepare(`
      INSERT INTO tracking_updates (parcel_id, status, location, description, updated_by_admin_id, latitude, longitude, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(parcelId, status, location || null, description, admin.id, latitude || null, longitude || null).run();
    
    await logActivity(db, {
      admin_id: admin?.id,
      entity_type: 'tracking',
      entity_id: parseInt(parcelId),
      action: 'tracking_updated',
      details: { status, location, description, latitude, longitude },
    });
    
    return c.json({ success: true });
  }
);

// Activity Logs
app.get("/api/admin/activity", adminAuth, async (c) => {
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '50');
  const entity_type = c.req.query('entity_type') || '';
  const offset = (page - 1) * limit;
  
  const db = c.env.DB;
  
  let query = `
    SELECT al.*, 
           u.name as user_name, u.email as user_email,
           au.name as admin_name, au.email as admin_email
    FROM activity_logs al
    LEFT JOIN users u ON al.user_id = u.id
    LEFT JOIN admin_users au ON al.admin_id = au.id
    WHERE 1=1
  `;
  let countQuery = "SELECT COUNT(*) as count FROM activity_logs WHERE 1=1";
  const binds = [];
  
  if (entity_type) {
    query += " AND al.entity_type = ?";
    countQuery += " AND entity_type = ?";
    binds.push(entity_type);
  }
  
  query += " ORDER BY al.created_at DESC LIMIT ? OFFSET ?";
  
  const [activities, count] = await Promise.all([
    db.prepare(query).bind(...binds, limit, offset).all(),
    db.prepare(countQuery).bind(...binds).first(),
  ]);
  
  const totalCount = (count as any)?.count || 0;
  
  return c.json({
    activities: activities.results,
    pagination: {
      page,
      limit,
      total: totalCount,
      pages: Math.ceil(totalCount / limit)
    }
  });
});

export default app;
