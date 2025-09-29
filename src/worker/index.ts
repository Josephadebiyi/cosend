import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { cors } from "hono/cors";
import { z } from "zod";
import authRoutes from './auth';
import adminRoutes from './admin';
import { logActivity, getClientIP, getUserAgent } from './utils';

type Env = {
  DB: D1Database;
  MOCHA_USERS_SERVICE_API_URL: string;
  MOCHA_USERS_SERVICE_API_KEY: string;
  ADMIN_JWT_SECRET: string;
};

const app = new Hono<{ Bindings: Env }>();

app.use("/*", cors());

// Mount auth routes
app.route('/', authRoutes);

// Mount admin routes
app.route('/', adminRoutes);

// Health check
app.get("/", (c) => {
  return c.json({ message: "BagShare API is running" });
});

// Parcels endpoints
app.get("/api/parcels", async (c) => {
  const db = c.env.DB;
  const result = await db.prepare("SELECT * FROM parcels ORDER BY created_at DESC").all();
  return c.json(result.results);
});

app.post("/api/parcels", 
  zValidator("json", z.object({
    sender_id: z.number(),
    from_city: z.string(),
    to_city: z.string(),
    parcel_type: z.string(),
    weight_kg: z.number(),
    price_euros: z.number(),
    service_fee_euros: z.number(),
  })),
  async (c) => {
    const data = c.req.valid("json");
    const db = c.env.DB;
    
    const result = await db.prepare(`
      INSERT INTO parcels (sender_id, from_city, to_city, parcel_type, weight_kg, price_euros, service_fee_euros, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `).bind(
      data.sender_id,
      data.from_city,
      data.to_city,
      data.parcel_type,
      data.weight_kg,
      data.price_euros,
      data.service_fee_euros
    ).run();
    
    // Log activity
    await logActivity(db, {
      user_id: data.sender_id,
      entity_type: 'parcel',
      entity_id: result.meta.last_row_id as number,
      action: 'created',
      details: data,
      ip_address: getClientIP(c.req.raw),
      user_agent: getUserAgent(c.req.raw),
    });
    
    return c.json({ id: result.meta.last_row_id, ...data });
  }
);

// Trips endpoints
app.get("/api/trips", async (c) => {
  const db = c.env.DB;
  const result = await db.prepare("SELECT * FROM trips WHERE status = 'active' ORDER BY departure_date ASC").all();
  return c.json(result.results);
});

app.post("/api/trips",
  zValidator("json", z.object({
    traveler_id: z.number(),
    from_city: z.string(),
    to_city: z.string(),
    departure_date: z.string(),
    departure_time: z.string().optional(),
    available_kg: z.number(),
  })),
  async (c) => {
    const data = c.req.valid("json");
    const db = c.env.DB;
    
    const result = await db.prepare(`
      INSERT INTO trips (traveler_id, from_city, to_city, departure_date, departure_time, available_kg, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `).bind(
      data.traveler_id,
      data.from_city,
      data.to_city,
      data.departure_date,
      data.departure_time || null,
      data.available_kg
    ).run();
    
    return c.json({ id: result.meta.last_row_id, ...data });
  }
);

// Transactions endpoints
app.get("/api/transactions/:userId", async (c) => {
  const userId = c.req.param("userId");
  const db = c.env.DB;
  
  const result = await db.prepare(`
    SELECT t.*, p.from_city, p.to_city, p.parcel_type 
    FROM transactions t
    LEFT JOIN parcels p ON t.parcel_id = p.id
    WHERE t.sender_id = ? OR t.traveler_id = ?
    ORDER BY t.created_at DESC
  `).bind(userId, userId).all();
  
  return c.json(result.results);
});

// Match parcel with trip
app.post("/api/match",
  zValidator("json", z.object({
    parcel_id: z.number(),
    trip_id: z.number(),
  })),
  async (c) => {
    const { parcel_id, trip_id } = c.req.valid("json");
    const db = c.env.DB;
    
    // Update parcel status and assign trip
    await db.prepare(`
      UPDATE parcels 
      SET trip_id = ?, status = 'matched', updated_at = datetime('now')
      WHERE id = ?
    `).bind(trip_id, parcel_id).run();
    
    // Update trip used capacity
    const parcel = await db.prepare("SELECT weight_kg FROM parcels WHERE id = ?").bind(parcel_id).first();
    
    if (parcel) {
      await db.prepare(`
        UPDATE trips 
        SET used_kg = used_kg + ?, updated_at = datetime('now')
        WHERE id = ?
      `).bind(parcel.weight_kg, trip_id).run();
    }
    
    return c.json({ success: true });
  }
);

// Update parcel status
app.put("/api/parcels/:id/status",
  zValidator("json", z.object({
    status: z.enum(['created', 'matched', 'picked_up', 'in_transit', 'delivered']),
    user_id: z.number().optional(),
  })),
  async (c) => {
    const id = c.req.param("id");
    const { status, user_id } = c.req.valid("json");
    const db = c.env.DB;
    
    const oldParcel = await db.prepare("SELECT * FROM parcels WHERE id = ?").bind(id).first();
    
    await db.prepare(`
      UPDATE parcels 
      SET status = ?, updated_at = datetime('now')
      WHERE id = ?
    `).bind(status, id).run();
    
    // Log activity
    if (oldParcel) {
      await logActivity(db, {
        user_id: user_id,
        entity_type: 'parcel',
        entity_id: parseInt(id),
        action: 'status_changed',
        details: { old_status: oldParcel.status, new_status: status },
        ip_address: getClientIP(c.req.raw),
        user_agent: getUserAgent(c.req.raw),
      });
    }
    
    return c.json({ success: true });
  }
);

// User Chat Support Endpoints
app.post("/api/support/chat",
  zValidator("json", z.object({
    user_id: z.number(),
    message: z.string(),
    parcel_id: z.number().optional(),
  })),
  async (c) => {
    const { user_id, message, parcel_id } = c.req.valid("json");
    const db = c.env.DB;
    
    const conversationId = `user_${user_id}_support`;
    
    await db.prepare(`
      INSERT INTO chat_messages (conversation_id, sender_type, sender_id, recipient_type, recipient_id, message, parcel_id, created_at)
      VALUES (?, 'user', ?, 'admin', 0, ?, ?, datetime('now'))
    `).bind(conversationId, user_id, message, parcel_id || null).run();
    
    await logActivity(db, {
      user_id: user_id,
      entity_type: 'chat',
      entity_id: user_id,
      action: 'support_message_sent',
      details: { message, parcel_id },
      ip_address: getClientIP(c.req.raw),
      user_agent: getUserAgent(c.req.raw),
    });
    
    return c.json({ success: true, conversation_id: conversationId });
  }
);

app.get("/api/support/chat/:userId", async (c) => {
  const userId = c.req.param("userId");
  const db = c.env.DB;
  
  const conversationId = `user_${userId}_support`;
  
  const messages = await db.prepare(`
    SELECT cm.*, au.name as admin_name
    FROM chat_messages cm
    LEFT JOIN admin_users au ON cm.sender_id = au.id AND cm.sender_type = 'admin'
    WHERE conversation_id = ?
    ORDER BY created_at ASC
  `).bind(conversationId).all();
  
  // Mark user messages as read
  await db.prepare(`
    UPDATE chat_messages 
    SET is_read = TRUE 
    WHERE conversation_id = ? AND recipient_type = 'user'
  `).bind(conversationId).run();
  
  return c.json({ messages: messages.results });
});

// Setup endpoint for creating first admin user
app.post("/api/setup/admin",
  zValidator("json", z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(8),
    setup_key: z.string(),
  })),
  async (c) => {
    const { email, name, password, setup_key } = c.req.valid("json");
    const db = c.env.DB;
    
    // Simple setup key check (in production, use a more secure method)
    if (setup_key !== "COSEND_SETUP_2024") {
      return c.json({ error: "Invalid setup key" }, 401);
    }
    
    // Check if any admin already exists
    const existingAdmin = await db.prepare("SELECT id FROM admin_users LIMIT 1").first();
    if (existingAdmin) {
      return c.json({ error: "Admin already exists" }, 409);
    }
    
    // Hash password (in production, use proper bcrypt)
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const passwordHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    await db.prepare(`
      INSERT INTO admin_users (email, name, password_hash, role, is_active, created_at, updated_at)
      VALUES (?, ?, ?, 'admin', TRUE, datetime('now'), datetime('now'))
    `).bind(email, name, passwordHash).run();
    
    return c.json({ success: true, message: "Admin user created successfully" });
  }
);

// Export app
export default app;
