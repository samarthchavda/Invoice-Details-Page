# Invoice Management System

A full-stack invoice management application built with **React**, **Express.js**, and **MongoDB**.

## Features

✅ Create invoices with line items  
✅ View invoice details  
✅ Track payments  
✅ Archive/Restore invoices  
✅ Real-time live preview  
✅ Automatic calculations  
✅ Responsive design with Tailwind CSS  

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Axios
- **Backend**: Express.js, Node.js, Mongoose
- **Database**: MongoDB Atlas
- **API**: RESTful

## Project Structure

```
Assignemt/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── invoiceController.js
│   ├── middleware/
│   │   └── logger.js
│   ├── models/
│   │   ├── Invoice.js
│   │   ├── InvoiceLine.js
│   │   └── Payment.js
│   ├── routes/
│   │   └── invoiceRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── InvoiceHeader.jsx
│   │   │   ├── LineItemsTable.jsx
│   │   │   ├── TotalsSection.jsx
│   │   │   ├── PaymentsList.jsx
│   │   │   ├── AddPaymentModal.jsx
│   │   │   └── InvoicePreview.jsx
│   │   ├── pages/
│   │   │   ├── InvoiceDetailsPage.jsx
│   │   │   └── CreateInvoicePage.jsx
│   │   ├── services/
│   │   │   └── invoiceAPI.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   ├── .env
│   └── index.html
│
└── README.md
```

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** (cloud database)

---

## Setup Instructions

### 1. Navigate to Project Directory

```bash
cd /path/to/Assignemt
```

### 2. Backend Environment Configuration

Navigate to the backend folder and create a `.env` file:

```bash
cd backend
```

Create `.env` file with:

```env
PORT=3001
MONGODB_URI=mongodb+srv://Study_Point:samarth123@cluster0.igiky9p.mongodb.net/invoice_management?retryWrites=true&w=majority&tls=true&appName=Cluster0
NODE_ENV=development

# Cloudinary Configuration (Optional)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Frontend Environment Configuration

Navigate to the frontend folder and create a `.env` file:

```bash
cd ../frontend
```

Create `.env` file with:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

---

## How to Run the Backend

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start the Server

```bash
npm start
```

**Expected Output:**
```
Server running on port 3001
MongoDB connected successfully
```

**Backend will be available at:** `http://localhost:3001`

**API Endpoints:**
- `GET /api/invoices/:id` - Get invoice details
- `POST /api/invoices` - Create invoice
- `POST /api/invoices/:id/payments` - Add payment
- `POST /api/invoices/:id/archive` - Archive invoice
- `POST /api/invoices/:id/restore` - Restore invoice
- `GET /api/health` - Health check

---

## How to Run the Frontend

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start the Development Server

```bash
npm run dev
```

**Expected Output:**
```
  VITE v4.5.14  ready in 171 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**Frontend will be available at:** `http://localhost:3000`

---

## Running Both Servers (Recommended)

Open **two terminal windows**:

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Then open your browser and visit: **http://localhost:3000**

---

## Application Workflow

| Page | URL | Description |
|------|-----|-------------|
| **Home** | http://localhost:3000 | Dashboard with navigation |
| **Create Invoice** | http://localhost:3000/invoices/new | Create invoices with live preview |
| **View Invoice** | http://localhost:3000/invoices/:id | View invoice and manage payments |

---

## Create Your First Invoice

### Via Web Interface
1. Go to http://localhost:3000/invoices/new
2. Fill in invoice details
3. Add line items
4. Click "Send Invoice"
5. View the invoice at the generated URL

### Via API (cURL)
```bash
curl -X POST http://localhost:3001/api/invoices \
  -H "Content-Type: application/json" \
  -d '{
    "invoiceNumber": "INV-001",
    "customerName": "Acme Enterprise",
    "issueDate": "2026-03-01",
    "dueDate": "2026-03-31",
    "address": "1901 Thornridge Cir, Hawaii",
    "currency": "USD",
    "lineItems": [
      {
        "description": "Web Development",
        "quantity": 10,
        "unitPrice": 5000
      },
      {
        "description": "UI/UX Design",
        "quantity": 5,
        "unitPrice": 3000
      }
    ]
  }'
```

---

## Troubleshooting

### Backend Won't Start
```bash
# Check if port 3001 is in use
lsof -i :3001

# Kill the process using port 3001
kill -9 <PID>

# Verify MongoDB connection string in .env
```

### Frontend Won't Start
```bash
# Check if port 3000 is in use
lsof -i :3000

# Clear and reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Verify .env has correct API URL
```

### MongoDB Connection Error
- Verify cluster is active in MongoDB Atlas
- Check username/password in connection string
- Ensure your IP is whitelisted in MongoDB Atlas

### API Connection Issues
- Ensure backend is running on port 3001
- Verify frontend `.env` has correct API URL
- Check browser console for error messages

---

## Database Models

**Invoice Schema:**
- invoiceNumber (String, unique)
- customerName (String)
- issueDate (Date)
- dueDate (Date)
- status (DRAFT | PAID)
- total (Number)
- amountPaid (Number)
- balanceDue (Number)

**InvoiceLine Schema:**
- invoiceId (Reference)
- description (String)
- quantity (Number)
- unitPrice (Number)
- lineTotal (Number)

**Payment Schema:**
- invoiceId (Reference)
- amount (Number)
- paymentDate (Date)

---

## Key Features

### Create Invoice
- Add customer details
- Create invoice number
- Add multiple line items
- Select currency
- Live preview updates in real-time
- Save as Draft or Send immediately

### Manage Invoices
- View complete invoice details
- Track all payments
- Add new payments with validation
- View balance due
- Archive completed invoices
- Restore archived invoices

### Automatic Calculations
- Line total = quantity × unit price
- Invoice total = sum of all line totals
- Tax calculation = total × 10%
- Balance due = total - amount paid
- Auto status update when paid

---

## License

MIT - Feel free to use for learning and development.

---

## Support

For issues:
1. Check terminal console for error messages
2. Verify all `.env` variables are set correctly
3. Ensure both servers are running
4. Check browser console (F12) for frontend errors

Happy invoicing! 📋✨
