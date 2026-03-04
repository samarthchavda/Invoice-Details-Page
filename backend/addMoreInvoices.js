require('dotenv').config();
const Invoice = require('./models/Invoice');
const mongoose = require('mongoose');

const newInvoices = [
  {
    invoiceNumber: 'INV-2026-006',
    customerName: 'Tech Solutions Inc',
    customerEmail: 'contact@techsolutions.com',
    dueDate: new Date('2026-04-15'),
    issueDate: new Date('2026-03-20'),
    lineItems: [
      { description: 'Cloud Consulting', quantity: 40, unitPrice: 150 },
      { description: 'Infrastructure Setup', quantity: 1, unitPrice: 5000 }
    ],
    taxRate: 10,
    notes: 'Payment due within 30 days',
    status: 'DRAFT'
  },
  {
    invoiceNumber: 'INV-2026-007',
    customerName: 'Digital Marketing Agency',
    customerEmail: 'billing@digitalagency.com',
    dueDate: new Date('2026-03-30'),
    issueDate: new Date('2026-03-01'),
    lineItems: [
      { description: 'SEO Optimization', quantity: 1, unitPrice: 2500 },
      { description: 'Social Media Management', quantity: 3, unitPrice: 1000 },
      { description: 'Content Writing', quantity: 15, unitPrice: 100 }
    ],
    taxRate: 10,
    notes: 'Monthly service invoice',
    status: 'DRAFT'
  }
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const inserted = await Invoice.insertMany(newInvoices);
    console.log(`✓ Added ${inserted.length} invoices`);
    inserted.forEach(inv => {
      const subtotal = inv.lineItems ? inv.lineItems.reduce((sum, li) => sum + li.quantity * li.unitPrice, 0) : 0;
      const total = subtotal * (1 + inv.taxRate / 100);
      console.log(`  - ${inv.invoiceNumber}: $${total.toFixed(2)}`);
    });
    console.log('Done');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();
