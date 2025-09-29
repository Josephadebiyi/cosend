# COSEND Admin Setup Guide

## Initial Setup

### 1. Create First Admin User

After deploying the application, create your first admin user by making a POST request to the setup endpoint:

```bash
curl -X POST https://cosend.mocha.app/api/setup/admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@cosend.app",
    "name": "Admin User",
    "password": "your-secure-password",
    "setup_key": "COSEND_SETUP_2024"
  }'
```

**Important:** This endpoint only works when no admin users exist and will be disabled after the first admin is created.

### 2. Login and Get Admin Token

```bash
curl -X POST https://cosend.mocha.app/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@cosend.app",
    "password": "your-secure-password"
  }'
```

Save the returned JWT token for subsequent API calls.

### 3. Set Environment Variables

Make sure the following environment variable is set in your Cloudflare Worker:

```
ADMIN_JWT_SECRET=your-very-secure-random-string-here
```

## Admin Dashboard Usage

### Quick Start Commands

1. **Get Dashboard Overview:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://cosend.mocha.app/api/admin/dashboard
```

2. **List All Users:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://cosend.mocha.app/api/admin/users
```

3. **Update Parcel Status:**
```bash
curl -X PUT -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "in_transit", "notes": "Package picked up"}' \
  https://cosend.mocha.app/api/admin/parcels/123/status
```

4. **View Chat Conversations:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://cosend.mocha.app/api/admin/chats
```

5. **Send Message to User:**
```bash
curl -X POST -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello! How can I help?", "user_id": 123}' \
  https://cosend.mocha.app/api/admin/chats/user_123_support/message
```

## Admin Web Interface (Optional)

You can build a simple web interface using the API. Here's a basic HTML example:

```html
<!DOCTYPE html>
<html>
<head>
    <title>COSEND Admin</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .stat-box { 
            background: #f5f5f5; 
            padding: 20px; 
            margin: 10px; 
            border-radius: 5px; 
            display: inline-block; 
            min-width: 150px;
        }
        .chat-message { 
            padding: 10px; 
            margin: 5px 0; 
            border-left: 3px solid #007cba; 
            background: #f9f9f9; 
        }
        .admin-message { border-left-color: #28a745; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        button { padding: 5px 10px; margin: 2px; cursor: pointer; }
        input, textarea { width: 100%; padding: 5px; margin: 5px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>COSEND Admin Dashboard</h1>
        
        <!-- Login Form -->
        <div id="loginForm">
            <h2>Admin Login</h2>
            <input type="email" id="email" placeholder="Email">
            <input type="password" id="password" placeholder="Password">
            <button onclick="login()">Login</button>
        </div>
        
        <!-- Dashboard -->
        <div id="dashboard" style="display: none;">
            <h2>Dashboard</h2>
            <div id="stats"></div>
            
            <h3>Recent Activity</h3>
            <div id="activity"></div>
            
            <h3>Chat Support</h3>
            <div id="chats"></div>
            
            <h3>Users</h3>
            <div id="users"></div>
            
            <h3>Parcels</h3>
            <div id="parcels"></div>
        </div>
    </div>

    <script>
        let token = localStorage.getItem('admin_token');
        
        if (token) {
            showDashboard();
        }
        
        async function login() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                const response = await fetch('/api/admin/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                if (data.success) {
                    token = data.token;
                    localStorage.setItem('admin_token', token);
                    showDashboard();
                } else {
                    alert('Login failed: ' + data.error);
                }
            } catch (error) {
                alert('Login error: ' + error.message);
            }
        }
        
        function showDashboard() {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            loadDashboard();
        }
        
        async function apiCall(endpoint, options = {}) {
            const response = await fetch(endpoint, {
                ...options,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });
            return response.json();
        }
        
        async function loadDashboard() {
            try {
                const data = await apiCall('/api/admin/dashboard');
                
                // Display stats
                document.getElementById('stats').innerHTML = `
                    <div class="stat-box">
                        <h4>Total Users</h4>
                        <p>${data.stats.total_users}</p>
                    </div>
                    <div class="stat-box">
                        <h4>Total Revenue</h4>
                        <p>€${data.stats.revenue}</p>
                    </div>
                    <div class="stat-box">
                        <h4>Transactions</h4>
                        <p>${data.stats.total_transactions}</p>
                    </div>
                `;
                
                // Load other sections
                loadChats();
                loadUsers();
                loadParcels();
                
            } catch (error) {
                console.error('Dashboard load error:', error);
            }
        }
        
        async function loadChats() {
            try {
                const data = await apiCall('/api/admin/chats');
                const chatsHtml = data.conversations.map(conv => `
                    <div class="chat-message">
                        <strong>${conv.user?.name || 'Unknown User'}</strong> 
                        (${conv.unread_count} unread)
                        <p>${conv.last_message}</p>
                        <button onclick="openChat('${conv.conversation_id}', ${conv.user_id})">
                            Open Chat
                        </button>
                    </div>
                `).join('');
                document.getElementById('chats').innerHTML = chatsHtml;
            } catch (error) {
                console.error('Chats load error:', error);
            }
        }
        
        async function loadUsers() {
            try {
                const data = await apiCall('/api/admin/users');
                const usersHtml = `
                    <table>
                        <tr><th>ID</th><th>Name</th><th>Email</th><th>Type</th><th>Verified</th><th>Actions</th></tr>
                        ${data.users.map(user => `
                            <tr>
                                <td>${user.id}</td>
                                <td>${user.name || 'N/A'}</td>
                                <td>${user.email}</td>
                                <td>${user.user_type}</td>
                                <td>${user.verified ? 'Yes' : 'No'}</td>
                                <td>
                                    <button onclick="toggleVerification(${user.id}, ${!user.verified})">
                                        ${user.verified ? 'Unverify' : 'Verify'}
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </table>
                `;
                document.getElementById('users').innerHTML = usersHtml;
            } catch (error) {
                console.error('Users load error:', error);
            }
        }
        
        async function loadParcels() {
            try {
                const data = await apiCall('/api/admin/parcels');
                const parcelsHtml = `
                    <table>
                        <tr><th>ID</th><th>From</th><th>To</th><th>Status</th><th>Sender</th><th>Actions</th></tr>
                        ${data.parcels.map(parcel => `
                            <tr>
                                <td>${parcel.id}</td>
                                <td>${parcel.from_city}</td>
                                <td>${parcel.to_city}</td>
                                <td>${parcel.status}</td>
                                <td>${parcel.sender_name || 'N/A'}</td>
                                <td>
                                    <select onchange="updateParcelStatus(${parcel.id}, this.value)">
                                        <option value="">Update Status</option>
                                        <option value="created">Created</option>
                                        <option value="matched">Matched</option>
                                        <option value="picked_up">Picked Up</option>
                                        <option value="in_transit">In Transit</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </td>
                            </tr>
                        `).join('')}
                    </table>
                `;
                document.getElementById('parcels').innerHTML = parcelsHtml;
            } catch (error) {
                console.error('Parcels load error:', error);
            }
        }
        
        async function toggleVerification(userId, verified) {
            try {
                await apiCall(`/api/admin/users/${userId}`, {
                    method: 'PUT',
                    body: JSON.stringify({ verified })
                });
                loadUsers();
            } catch (error) {
                alert('Error updating user: ' + error.message);
            }
        }
        
        async function updateParcelStatus(parcelId, status) {
            if (!status) return;
            
            try {
                await apiCall(`/api/admin/parcels/${parcelId}/status`, {
                    method: 'PUT',
                    body: JSON.stringify({ status, notes: `Status updated to ${status} by admin` })
                });
                loadParcels();
            } catch (error) {
                alert('Error updating parcel: ' + error.message);
            }
        }
        
        function openChat(conversationId, userId) {
            // Simple chat interface - you can expand this
            const message = prompt('Enter message to send:');
            if (message) {
                sendMessage(conversationId, userId, message);
            }
        }
        
        async function sendMessage(conversationId, userId, message) {
            try {
                await apiCall(`/api/admin/chats/${conversationId}/message`, {
                    method: 'POST',
                    body: JSON.stringify({ user_id: userId, message })
                });
                alert('Message sent successfully');
                loadChats();
            } catch (error) {
                alert('Error sending message: ' + error.message);
            }
        }
    </script>
</body>
</html>
```

## Security Recommendations

1. **Change Default Setup Key:** Modify the setup key in the code before deployment
2. **Use Strong Passwords:** Ensure admin passwords are strong and unique
3. **Regular Token Rotation:** Implement token refresh mechanism
4. **IP Restrictions:** Consider adding IP allowlisting for admin access
5. **Audit Logs:** Regularly review activity logs for suspicious activity
6. **HTTPS Only:** Ensure all admin communications use HTTPS
7. **Password Hashing:** In production, replace simple SHA-256 with proper bcrypt hashing

## Monitoring and Alerts

Set up monitoring for:
- Failed login attempts
- Unusual activity patterns
- High-value transactions
- User complaints or support requests
- System errors and performance issues

## Backup and Recovery

- Regularly backup the D1 database
- Document admin recovery procedures
- Test backup restoration process
- Keep encrypted backups of critical data

This admin system provides comprehensive control over the COSEND platform while maintaining security and audit trails for all administrative actions.
