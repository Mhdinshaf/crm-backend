# 🚀 VibeIt CRM - Full-Stack Customer Relationship Management System

A professional-grade, full-stack CRM application designed to help sales teams track leads, manage customer interactions, and monitor their sales pipeline. Built with **Node.js, Express, React, and MySQL**, VibeIt CRM offers a clean user interface, secure backend architecture, and production-ready features.

---

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Installation & Setup](#-installation--setup)
- [🗄️ Database Schema](#️-database-schema)
- [🔌 API Endpoints](#-api-endpoints)
- [🔐 Security Features](#-security-features)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [📝 API Usage Examples](#-api-usage-examples)
- [💡 Development Notes](#-development-notes)

---

## 🌟 Features

### Dashboard Analytics
- **Real-time Statistics**: Total leads, New leads, Qualified leads, Won deals, Lost deals
- **Visual Overview**: Quick summary of sales pipeline status
- **Performance Metrics**: Track conversion funnel and deal values

### Lead Management (Complete CRUD)
- ✅ **Create**: Add new leads with full details
- ✅ **Read**: View all leads with advanced filtering
- ✅ **Update**: Modify lead information, status, and assignments
- ✅ **Delete**: Remove leads from the system
- ✅ **Fields**: Lead Name, Company, Email, Phone, Source, Status, Deal Value

### Salesperson Assignment
- Assign leads to specific team members
- Track which salesperson is responsible for each lead
- Unassign leads when needed
- View assigned salesperson email details

### Advanced Filtering & Search
- **Search by Name**: Find leads by contact name
- **Search by Email**: Locate leads by email address
- **Filter by Status**: New, Contacted, Qualified, Proposal Sent, Won, Lost
- **Filter by Source**: Website, LinkedIn, Referral, etc.

### Lead Notes & Follow-ups
- Add internal notes for every lead
- Track customer interactions and follow-ups
- View note history with creator information
- Timestamps for all notes

### User Authentication
- Secure JWT-based authentication
- Bcrypt password hashing
- Session management with 1-day token expiration
- Role-based access control

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
| :--- | :--- | :--- |
| **Frontend** | React.js (Vite) | 18+ |
| **Styling** | Tailwind CSS | 3+ |
| **Icons** | Lucide React | Latest |
| **HTTP Client** | Axios | 1.6+ |
| **Backend** | Node.js | 16+ |
| **Server** | Express.js | 5+ |
| **Database** | MySQL | 8.0+ |
| **Authentication** | JWT (jsonwebtoken) | 9+ |
| **Password Hashing** | Bcryptjs | 3+ |
| **Security** | Helmet.js | 8+ |
| **Rate Limiting** | express-rate-limit | 8+ |
| **Input Validation** | express-validator | 7+ |
| **Environment** | dotenv | 17+ |

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** 16.x or higher
- **npm** or **yarn** package manager
- **MySQL** 8.0 or higher
- **Git** (for cloning the repository)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd crm-backend
```

### Step 2: Database Setup (MySQL)

#### Option A: Using MySQL CLI
```bash
# Connect to MySQL
mysql -u root -p

# Create database and tables
CREATE DATABASE crm_db;
USE crm_db;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Leads table
CREATE TABLE leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lead_name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  source VARCHAR(100),
  status ENUM('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost') DEFAULT 'New',
  deal_value DECIMAL(10, 2) DEFAULT 0.00,
  assigned_salesperson_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (assigned_salesperson_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Notes table
CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lead_id INT NOT NULL,
  content TEXT NOT NULL,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);
```

#### Option B: Using MySQL Workbench
1. Open MySQL Workbench
2. Create a new connection or use existing
3. Click "Create New Schema" → Name it `crm_db`
4. Execute the SQL scripts above

### Step 3: Backend Configuration

1. **Install Dependencies**
```bash
npm install
```

2. **Create `.env` File**
```bash
# In the project root directory, create a .env file with:

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=crm_db

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

3. **Seed Admin User** (Optional but Recommended)
```bash
node seed.js
# This creates an admin user with:
# Email: admin@example.com
# Password: (randomly generated, shown in console)
```

4. **Start the Backend Server**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will be running at `http://localhost:5000`

---

## 🗄️ Database Schema

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Columns:**
- `id` - Unique user identifier (Primary Key)
- `email` - User email address (Must be unique)
- `password_hash` - Bcrypt hashed password (Never store plain passwords)
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

---

#### 2. **leads** Table
Stores customer lead information for CRM tracking.

```sql
CREATE TABLE leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lead_name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  source VARCHAR(100),
  status ENUM('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost') DEFAULT 'New',
  deal_value DECIMAL(10, 2) DEFAULT 0.00,
  assigned_salesperson_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (assigned_salesperson_id) REFERENCES users(id) ON DELETE SET NULL
);
```

**Columns:**
- `id` - Unique lead identifier (Primary Key)
- `lead_name` - Contact person's name (Required)
- `company_name` - Company/Organization name
- `email` - Contact email address
- `phone` - Contact phone number
- `source` - Lead source (e.g., Website, LinkedIn, Referral)
- `status` - Lead status: New, Contacted, Qualified, Proposal Sent, Won, Lost
- `deal_value` - Potential deal value in currency
- `assigned_salesperson_id` - References the assigned user (Foreign Key to users table)
- `created_at` - Lead creation timestamp
- `updated_at` - Last update timestamp

**Relationships:**
- Each lead is assigned to one user (many-to-one) via `assigned_salesperson_id`
- If salesperson is deleted, assignment is set to NULL (ON DELETE SET NULL)

---

#### 3. **notes** Table
Stores internal notes and communications related to leads.

```sql
CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lead_id INT NOT NULL,
  content TEXT NOT NULL,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);
```

**Columns:**
- `id` - Unique note identifier (Primary Key)
- `lead_id` - Associated lead (Foreign Key to leads table)
- `content` - Note content/description
- `created_by` - User who created the note (Foreign Key to users table)
- `created_at` - Note creation timestamp
- `updated_at` - Last update timestamp

**Relationships:**
- Each note belongs to one lead (many-to-one)
- Each note is created by one user (many-to-one)

---

## Database Setup

### Prerequisites
- MySQL 8.0 or higher
- Node.js 16.x or higher
- npm or yarn

### Installation Steps

1. **Create the database:**
```sql
CREATE DATABASE crm_db;
USE crm_db;
```

2. **Create the tables:**
```sql
-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Leads table
CREATE TABLE leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lead_name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  source VARCHAR(100) DEFAULT 'Website',
  status VARCHAR(50) DEFAULT 'New',
  deal_value DECIMAL(12, 2) DEFAULT 0.00,
  assigned_salesperson VARCHAR(255) DEFAULT 'Unassigned',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Notes table
CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lead_id INT NOT NULL,
  content TEXT NOT NULL,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);
```

2. **Configure environment variables** in `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=crm_db
JWT_SECRET=your_secret_key_here
PORT=5000
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

4. **Install dependencies:**
```bash
npm install
```

5. **Seed initial admin user:**
```bash
node seed.js
```

6. **Start the server:**
```bash
npm start          # Production mode
npm run dev        # Development mode with auto-reload
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "your_password"
}

Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@example.com"
  }
}
```

---

### Lead Endpoints

#### Get All Leads
```http
GET /leads
Authorization: Bearer {token}

Response (200): [{ lead objects }]
```

#### Create Lead
```http
POST /leads
Authorization: Bearer {token}
Content-Type: application/json

{
  "lead_name": "Jane Smith",
  "company_name": "Tech Solutions",
  "email": "jane@techsolutions.com",
  "phone": "555-5678",
  "source": "LinkedIn",
  "status": "New",
  "deal_value": 75000,
  "assigned_salesperson_id": 2
}

Response (201):
{
  "message": "Lead created successfully!",
  "leadId": 2
}
```

#### Update Lead
```http
PUT /leads/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "Proposal Sent",
  "deal_value": 80000,
  "assigned_salesperson_id": 3
}

Response (200):
{
  "message": "Lead updated successfully!"
}
```

#### Delete Lead
```http
DELETE /leads/{id}
Authorization: Bearer {token}

Response (200):
{
  "message": "Lead deleted successfully!"
}
```

---

### Note Endpoints

#### Get Notes for a Lead
```http
GET /notes/lead/{leadId}
Authorization: Bearer {token}

Response (200): [{ note objects }]
```

#### Create Note
```http
POST /notes
Authorization: Bearer {token}
Content-Type: application/json

{
  "lead_id": 1,
  "content": "Follow up on proposal by Friday"
}

Response (201):
{
  "message": "Note added successfully!",
  "noteId": 2
}
```

---

## 🔐 Security Features

### 1. **Helmet.js** - HTTP Headers Security
- Sets secure HTTP response headers
- Protects against XSS, clickjacking, MIME sniffing
- Content Security Policy enabled

### 2. **Rate Limiting**
- 100 requests per 15 minutes per IP
- Prevents brute force attacks and DDoS
- Returns 429 error when limit exceeded

### 3. **JWT Authentication**
- Token-based stateless authentication
- 1-day token expiration
- Signed with secret key (must change in production)
- Verified on all protected endpoints

### 4. **Bcrypt Password Hashing**
- Salt rounds: 10
- Prevents plaintext password storage
- Secure password comparison

### 5. **Input Validation**
- express-validator middleware
- Validates all incoming data
- Email, phone, numeric fields checked
- Prevents malformed data

### 6. **CORS Configuration**
- Restricted to allowed origins
- Only `http://localhost:3000` by default
- Configurable via `CORS_ORIGIN` env variable

### 7. **SQL Injection Prevention**
- Parameterized queries (prepared statements)
- No string concatenation in SQL
- Secure data binding

---

## 🚀 Getting Started

### Quick Start (5 minutes)

1. **Clone & Install**
```bash
git clone <repo-url>
cd crm-backend
npm install
```

2. **Setup Database**
```bash
mysql -u root -p < create_database.sql
```

3. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. **Seed Admin User**
```bash
node seed.js
```

5. **Start Server**
```bash
npm run dev
```

6. **Test API**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"YourPassword123"}'
```

---

## 📝 API Usage Examples

### Example 1: Complete Lead Creation Flow

```javascript
// 1. Login to get token
const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
  email: 'admin@example.com',
  password: 'admin_password'
});

const token = loginResponse.data.token;

// 2. Create a new lead
const leadResponse = await axios.post(
  'http://localhost:5000/api/leads',
  {
    lead_name: 'Alice Johnson',
    company_name: 'StartUp Inc',
    email: 'alice@startup.com',
    phone: '555-9999',
    source: 'Website',
    status: 'New',
    deal_value: 100000,
    assigned_salesperson_id: 1
  },
  { headers: { Authorization: `Bearer ${token}` } }
);

console.log('Lead created:', leadResponse.data);
```

### Example 2: Update Lead Status

```javascript
await axios.put(
  'http://localhost:5000/api/leads/3',
  {
    status: 'Proposal Sent',
    deal_value: 120000,
    assigned_salesperson_id: 2
  },
  { headers: { Authorization: `Bearer ${token}` } }
);
```

### Example 3: Unassign a Lead

```javascript
// Set assigned_salesperson_id to null to unassign
await axios.put(
  'http://localhost:5000/api/leads/3',
  {
    assigned_salesperson_id: null
  },
  { headers: { Authorization: `Bearer ${token}` } }
);
```

---

## 💡 Development Notes

### Password Hashing
- Uses bcryptjs with 10 salt rounds
- Hash time: ~100ms (secure but performant)
- Never store or log plaintext passwords

### Database Connection Pooling
- Connection pool size: 10
- Queue limit: 0 (unlimited)
- Improves concurrent request handling
- Connection reuse across requests

### Token Expiration
- JWT tokens expire after 24 hours
- Tokens include user `id` and `email`
- Refresh tokens not implemented (add in production)

### Timestamps
- All timestamps in UTC
- `created_at`: Set once at creation
- `updated_at`: Auto-updated on modifications
- Use `ORDER BY created_at DESC` for chronological sorting

### Null Handling
- `assigned_salesperson_id` can be NULL (unassigned)
- `email`, `phone`, `source` are optional
- NULL values treated as "no assignment" in queries

## 📁 Project Structure

```
crm-backend/
├── routes/
│   ├── auth.js              # Authentication endpoints (login)
│   ├── leads.js             # Lead CRUD operations
│   └── notes.js             # Note management
├── middleware/
│   ├── auth.js              # JWT verification middleware
│   └── validators.js        # Input validation middleware
├── db.js                    # Database connection pool (MySQL)
├── server.js                # Express app setup & configuration
├── seed.js                  # Database seeding script
├── package.json             # NPM dependencies & scripts
├── .env                     # Environment variables (not committed)
├── .env.example            # Example env template
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

### Key Files

| File | Purpose |
| :--- | :--- |
| `server.js` | Express server setup, middleware configuration, routes mounting |
| `db.js` | MySQL connection pool with 10 max connections |
| `routes/auth.js` | JWT login endpoint with bcrypt password verification |
| `routes/leads.js` | CRUD endpoints for lead management |
| `routes/notes.js` | Note creation and retrieval endpoints |
| `middleware/auth.js` | JWT token verification for protected routes |
| `middleware/validators.js` | express-validator rules for input sanitization |
| `seed.js` | Creates initial admin user in database |

---

## ⚠️ Error Messages Reference

| Error | Status | Cause | Solution |
| :--- | :--- | :--- | :--- |
| Invalid email or password | 401 | Wrong login credentials | Check email/password |
| Access Denied. No token provided | 401 | Missing Authorization header | Add JWT token to header |
| Invalid Token | 401 | Malformed or expired token | Login again to get new token |
| Too many requests | 429 | Rate limit exceeded | Wait 15 minutes |
| Email must be valid | 400 | Invalid email format | Provide valid email |
| Phone must be valid | 400 | Invalid phone format | Provide valid phone |
| Deal value must be positive | 400 | Negative deal value | Use positive number |
| Status must be valid | 400 | Unknown status value | Use: New, Contacted, Qualified, Proposal Sent, Won, Lost |

---

## 📊 Response Format

All API responses follow a consistent format:

### Success Response (200, 201)
```json
{
  "message": "Operation successful",
  "leadId": 1,
  "data": { /* object or array */ }
}
```

### Error Response (4xx, 5xx)
```json
{
  "success": false,
  "message": "Human-readable error description",
  "errors": [
    {
      "field": "email",
      "message": "Email must be valid"
    }
  ]
}
```

---

## 🔍 Performance Tips

1. **Use Indexes**: Add indexes on frequently searched columns
```sql
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_lead_status ON leads(status);
CREATE INDEX idx_lead_salesperson ON leads(assigned_salesperson_id);
```

2. **Batch Operations**: When creating multiple leads, batch them in transactions

3. **Connection Reuse**: MySQL connection pool reuses connections automatically

4. **Response Caching**: Consider caching GET /leads response on frontend

---

## 🛡️ Production Checklist

- [ ] Change `JWT_SECRET` to strong random value
- [ ] Set `NODE_ENV=production`
- [ ] Update `CORS_ORIGIN` to production domain
- [ ] Use HTTPS (add `https-redirect` middleware)
- [ ] Enable database backups
- [ ] Set up monitoring/logging
- [ ] Use environment-specific .env files
- [ ] Add rate limiting headers to responses
- [ ] Implement token refresh mechanism
- [ ] Add request logging middleware
- [ ] Test all error scenarios
- [ ] Load test the database
- [ ] Review security headers

---

## 🐛 Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution**: Ensure MySQL is running and credentials in `.env` are correct

### JWT Token Expired
```
Error: Invalid Token
```
**Solution**: Login again to get a fresh token (tokens expire after 24 hours)

### Rate Limit Exceeded
```
Error: Too many requests from this IP
```
**Solution**: Wait 15 minutes for limit reset

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution**: Change PORT in `.env` or kill existing process on that port

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [JWT.io](https://jwt.io/)
- [Bcryptjs NPM](https://www.npmjs.com/package/bcryptjs)
- [Helmet.js Security](https://helmetjs.github.io/)

---

## 👨‍💼 Contributing

For contribution guidelines, create an issue or submit a pull request.

---

## 📄 License

This project is licensed under the **ISC License** - see LICENSE file for details.

---

**Built with ❤️ | © 2026 VibeIt CRM | All Rights Reserved**
