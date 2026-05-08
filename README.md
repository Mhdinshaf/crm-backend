# 🚀 CRM Backend API

A simple CRM (Customer Relationship Management) backend built using Node.js, Express.js, MySQL, and JWT Authentication.  
This project provides secure authentication and protected CRUD APIs for managing leads.

---

# 📌 Features

- 🔐 JWT Authentication
- 🔑 Password Hashing with bcrypt
- 🛡️ Protected Routes using Middleware
- 📦 REST API with Express.js
- 🗄️ MySQL Database Integration
- 👤 Admin Seeder Script
- 📋 Leads CRUD Operations
- 🌍 Environment Variables Support
- ⚡ Async/Await Based Clean Code Structure

---

# 🛠️ Technologies Used

- Node.js
- Express.js
- MySQL
- mysql2
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- cors
- nodemon

---

# 📁 Project Structure

```bash
crm-backend/
│
├── middleware/
│   └── auth.js
│
├── routes/
│   ├── auth.js
│   └── leads.js
│
├── .env
├── db.js
├── seed.js
├── server.js
├── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Mhdinshaf/crm-backend.git
```

---

## 2️⃣ Navigate into the Project

```bash
cd crm-backend
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

# 🗄️ Database Setup

Create a MySQL database named:

```sql
managemnt_db
```

---

## Create `users` Table

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Create `leads` Table

```sql
CREATE TABLE leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lead_name VARCHAR(255),
    company_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    source VARCHAR(100),
    status VARCHAR(100) DEFAULT 'New',
    deal_value DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=managemnt_db

JWT_SECRET=your_secret_key
```

---

# 👤 Seed Admin User

Run the following command to create the default admin user:

```bash
node seed.js
```

Default admin credentials:

```bash
Email: admin@example.com
Password: password123
```

---

# ▶️ Run the Server

## Development Mode

```bash
npm run dev
```

## Production Mode

```bash
npm start
```

Server will run on:

```bash
http://localhost:5000
```

---

# 🔐 Authentication

After login, the API returns a JWT token.

Add the token to request headers:

```bash
Authorization: Bearer YOUR_TOKEN
```

---

# 📡 API Endpoints

---

## 🔑 Auth Routes

### Login

```http
POST /api/auth/login
```

### Request Body

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

---

# 📋 Lead Routes

## Get All Leads

```http
GET /api/leads
```

---

## Create Lead

```http
POST /api/leads
```

### Request Body

```json
{
  "lead_name": "John Doe",
  "company_name": "ABC Company",
  "email": "john@example.com",
  "phone": "0771234567",
  "source": "Website",
  "status": "New",
  "deal_value": 5000
}
```

---

## Update Lead

```http
PUT /api/leads/:id
```

### Request Body

```json
{
  "status": "Qualified",
  "deal_value": 10000
}
```

---

## Delete Lead

```http
DELETE /api/leads/:id
```

---

# 🛡️ Security Features

- Password hashing using bcrypt
- JWT token authentication
- Protected routes middleware
- SQL Injection prevention using parameterized queries
- Environment variables for sensitive data

---

# 🔥 Future Improvements

- Role-Based Authentication
- Refresh Tokens
- Input Validation
- Pagination
- Search & Filters
- Docker Support
- API Documentation with Swagger

---

# 👨‍💻 Author

Mohomed Inshaf

GitHub:
https://github.com/Mhdinshaf

---

# 📄 License

This project is licensed under the ISC License.
