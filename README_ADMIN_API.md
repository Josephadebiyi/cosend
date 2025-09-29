# COSEND Admin API Documentation

## Overview
This document describes the admin API endpoints for managing the COSEND application backend. The API provides comprehensive tools for monitoring, user management, chat support, and tracking updates.

## Authentication
All admin endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Base URL
```
https://cosend.mocha.app/api/admin
```

## Endpoints

### Authentication

#### Login
```http
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@cosend.app",
  "password": "your-password"
}
```

**Response:**
```json
{
  "success": true,
  "admin": {
    "id": 1,
    "email": "admin@cosend.app",
    "name": "Admin User",
    "role": "admin"
  },
  "token": "jwt-token-here"
}
```

#### Logout
```http
POST /api/admin/logout
Authorization: Bearer <token>
```

### Dashboard Analytics

#### Get Dashboard Stats
```http
GET /api/admin/dashboard
Authorization: Bearer <token>
```

**Response:**
```json
{
  "stats": {
    "total_users": 150,
    "parcels": [
      {"status": "created", "count": 25},
      {"status": "in_transit", "count": 40},
      {"status": "delivered", "count": 85}
    ],
    "trips": [
      {"status": "active", "count": 15},
      {"status": "completed", "count": 120}
    ],
    "revenue": 2450.75,
    "total_transactions": 150
  },
  "recent_activity": [...]
}
```

### User Management

#### List Users
```http
GET /api/admin/users?page=1&limit=20&search=john
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `search` (optional): Search by email, name, or phone

#### Get User Details
```http
GET /api/admin/users/{user_id}
Authorization: Bearer <token>
```

#### Update User
```http
PUT /api/admin/users/{user_id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "verified": true,
  "user_type": "both",
  "name": "Updated Name"
}
```

### Parcel Management

#### List Parcels
```http
GET /api/admin/parcels?page=1&limit=20&status=in_transit
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `status` (optional): Filter by status

#### Update Parcel Status
```http
PUT /api/admin/parcels/{parcel_id}/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "in_transit",
  "notes": "Package picked up from sender"
}
```

### Chat Management

#### List Conversations
```http
GET /api/admin/chats
Authorization: Bearer <token>
```

**Response:**
```json
{
  "conversations": [
    {
      "conversation_id": "user_123_support",
      "last_message_at": "2024-01-15T10:30:00Z",
      "message_count": 5,
      "unread_count": 2,
      "user_id": 123,
      "last_message": "Hello, I need help with my package",
      "user": {
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ]
}
```

#### Get Conversation Messages
```http
GET /api/admin/chats/{conversation_id}
Authorization: Bearer <token>
```

#### Send Message to User
```http
POST /api/admin/chats/{conversation_id}/message
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Hello! How can I help you today?",
  "user_id": 123
}
```

### Tracking Management

#### Get Tracking History
```http
GET /api/admin/tracking/{parcel_id}
Authorization: Bearer <token>
```

#### Add Tracking Update
```http
POST /api/admin/tracking/{parcel_id}/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "in_transit",
  "location": "Madrid Distribution Center",
  "description": "Package is being processed at distribution center",
  "latitude": 40.4168,
  "longitude": -3.7038
}
```

### Activity Logs

#### Get Activity Logs
```http
GET /api/admin/activity?page=1&limit=50&entity_type=parcel
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `entity_type` (optional): Filter by entity type (parcel, user, trip, etc.)

## Activity Types Tracked

The system automatically tracks the following activities:

### User Activities
- `user_created` - New user registration
- `user_updated` - Profile updates
- `user_verified` - KYC verification completed

### Parcel Activities
- `parcel_created` - New parcel request
- `parcel_matched` - Matched with traveler
- `status_changed` - Status updates
- `tracking_updated` - Location/tracking updates

### Trip Activities
- `trip_created` - New trip listing
- `trip_completed` - Trip marked as completed
- `trip_cancelled` - Trip cancelled

### Transaction Activities
- `payment_processed` - Payment completed
- `payout_sent` - Traveler payout processed
- `refund_issued` - Refund processed

### Chat Activities
- `message_sent` - Admin message sent to user
- `conversation_started` - New support conversation

## Error Responses

All endpoints return appropriate HTTP status codes and error messages:

```json
{
  "error": "Error description",
  "code": "ERROR_CODE"
}
```

Common error codes:
- `401` - Unauthorized (invalid or missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not found
- `400` - Bad request (validation errors)
- `500` - Internal server error

## Rate Limiting

Admin API endpoints are rate-limited to prevent abuse:
- Authentication endpoints: 5 requests per minute
- Other endpoints: 100 requests per minute per admin user

## Security Notes

1. All API communications must use HTTPS
2. JWT tokens expire after 24 hours
3. Admin sessions are tracked and can be revoked
4. All admin actions are logged for audit purposes
5. IP addresses and user agents are recorded for security monitoring

## Setup Instructions

1. Create admin user in database:
```sql
INSERT INTO admin_users (email, name, password_hash, role, is_active) 
VALUES ('admin@cosend.app', 'Admin User', 'hashed_password', 'admin', TRUE);
```

2. Set the `ADMIN_JWT_SECRET` environment variable with a secure random string

3. Admin login credentials should be securely managed and rotated regularly

## Integration Examples

### JavaScript/Node.js
```javascript
const adminAPI = {
  baseURL: 'https://cosend.mocha.app/api/admin',
  token: null,
  
  async login(email, password) {
    const response = await fetch(`${this.baseURL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    this.token = data.token;
    return data;
  },
  
  async getUsers(page = 1, limit = 20) {
    const response = await fetch(`${this.baseURL}/users?page=${page}&limit=${limit}`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
    return response.json();
  },
  
  async sendMessage(conversationId, userId, message) {
    const response = await fetch(`${this.baseURL}/chats/${conversationId}/message`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_id: userId, message })
    });
    return response.json();
  }
};
```

### Python
```python
import requests

class CosendAdminAPI:
    def __init__(self, base_url="https://cosend.mocha.app/api/admin"):
        self.base_url = base_url
        self.token = None
    
    def login(self, email, password):
        response = requests.post(f"{self.base_url}/login", 
                               json={"email": email, "password": password})
        data = response.json()
        self.token = data.get("token")
        return data
    
    def get_dashboard(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        response = requests.get(f"{self.base_url}/dashboard", headers=headers)
        return response.json()
    
    def update_parcel_status(self, parcel_id, status, notes=""):
        headers = {"Authorization": f"Bearer {self.token}"}
        data = {"status": status, "notes": notes}
        response = requests.put(f"{self.base_url}/parcels/{parcel_id}/status", 
                              json=data, headers=headers)
        return response.json()
```

This API provides comprehensive admin functionality for managing the COSEND platform, tracking activities, communicating with users, and monitoring all aspects of the delivery service.
