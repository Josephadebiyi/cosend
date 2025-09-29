// Utility functions for the worker

// Helper function to log activities
export const logActivity = async (db: D1Database, data: {
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

export const generateConversationId = (userId: number, adminId?: number): string => {
  if (adminId) {
    return `admin_${adminId}_user_${userId}`;
  }
  return `user_${userId}_support`;
};

export const hashPassword = async (password: string): Promise<string> => {
  // In production, use proper bcrypt hashing
  // For now, using a simple hash (NOT SECURE FOR PRODUCTION)
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const formatDateTime = (date: Date): string => {
  return date.toISOString().replace('T', ' ').slice(0, 19);
};

export const getClientIP = (request: Request): string => {
  return request.headers.get('CF-Connecting-IP') || 
         request.headers.get('X-Forwarded-For') || 
         request.headers.get('X-Real-IP') || 
         'unknown';
};

export const getUserAgent = (request: Request): string => {
  return request.headers.get('User-Agent') || 'unknown';
};
