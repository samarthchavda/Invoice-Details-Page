# Invoice Details Page (MERN Stack)

## 📌 Project Overview

This is a Full Stack Invoice Details Module built using the MERN stack (MongoDB, Express, React, Node.js).

The application allows users to:

- View invoice details
- View line items
- View payment history
- Add new payments
- Automatically update balance and invoice status
- Archive and restore invoices

This project focuses on implementing proper business logic, API validation, and clean UI structure.

---

## 🛠 Tech Stack

### Frontend
- React
- React Router
- Axios
- CSS / Tailwind (if used)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 🧠 Business Logic Implemented

- Line Total = quantity × unitPrice
- Total = sum of all line totals
- Balance Due = total – amountPaid
- Overpayment is not allowed
- If balanceDue = 0 → Status automatically changes to PAID
- Invoice can be archived and restored

---

## 📂 Project Structure

Invoice-Details-Page/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── frontend/
│   ├── pages/
│   ├── components/
│   └── services/
│
└── README.md

---

## ⚙️ Backend Setup

1. Navigate to backend folder:

cd backend

2. Install dependencies:

npm install

3. Create a `.env` file and add:

PORT=5000
MONGODB_URI=your_mongodb_connection_string

4. Start server:

npm start

Backend will run on:
http://localhost:5000

---

## 🎨 Frontend Setup

1. Navigate to frontend folder:

cd frontend

2. Install dependencies:

npm install

3. Start frontend:

npm run dev

Frontend will run on:
http://localhost:5173

---

## 🔗 API Endpoints

### Get Invoice Details
GET /api/invoices/:id

### Add Payment
POST /api/invoices/:id/payments

Rules:
- amount > 0
- amount ≤ balanceDue
- Prevent overpayment
- Auto update status to PAID when fully paid

### Archive Invoice
POST /api/invoices/archive

### Restore Invoice
POST /api/invoices/restore

---

## 💡 Key Features

✔ Invoice header section  
✔ Line items table  
✔ Totals calculation  
✔ Payment history  
✔ Add payment modal  
✔ Status badge (DRAFT / PAID)  
✔ Archive & restore functionality  

---

## 🚀 Bonus Features Implemented (+50 Points)

✅ **Authentication (JWT)** - User registration and login with JWT tokens
- POST /api/auth/register - Register new user with hashed password
- POST /api/auth/login - Login and receive JWT token
- GET /api/auth/profile - Get authenticated user profile

✅ **PDF Invoice Generation** - Download invoices as PDF
- GET /api/invoices/:id/pdf - Generate and download invoice PDF
- Includes invoice details, line items, and payment history

✅ **Tax Calculation** - Configurable tax rates per invoice
- Added taxRate and taxAmount fields to Invoice model
- Automatic tax calculation with subtotal support
- Display tax breakdown in invoice details

✅ **Multi-Currency Support** - USD, EUR, GBP, INR
- Currency selection dropdown in forms
- Dynamic currency symbols based on selection
- Backend currency utilities for symbol and name mapping

✅ **Overdue Status Logic** - Automatic overdue tracking
- isOverdue flag on Invoice model
- Automatically marked overdue if dueDate < today AND balanceDue > 0
- OVERDUE badge in invoice header when applicable

✅ **Advanced UI Animations** - Framer Motion animations
- Page entrance animations with fade and slide effects
- Modal animations with spring physics
- Button interactions with whileHover and whileTap
- Smooth transitions on all interactive elements
- Login page with gradient background and staggered input animations

---

## 🚀 Future Improvements (Optional)

- Email notifications for overdue invoices
- Recurring invoice templates
- Multi-language support
- Invoice versioning
- Client portal access

---

## 👨‍💻 Author

Samarth Chavda
