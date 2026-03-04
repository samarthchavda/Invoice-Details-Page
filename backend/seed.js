require('dotenv').config();
const mongoose = require('mongoose');
const Invoice = require('./models/Invoice');
const InvoiceLine = require('./models/InvoiceLine');

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const invoice = new Invoice({
    invoiceNumber: 'INV-2026-003',
    customerName: 'Tech Solutions Inc',
    issueDate: new Date('2026-03-04'),
    dueDate: new Date('2026-04-04'),
    total: 0,
    amountPaid: 0,
    balanceDue: 0,
    status: 'DRAFT',
    isArchived: false
  });
  
  await invoice.save();
  console.log('Invoice created:', invoice._id);
  
  const line1 = new InvoiceLine({
    invoiceId: invoice._id,
    description: 'Software Development',
    quantity: 50,
    unitPrice: 120
  });
  await line1.save();
  
  const line2 = new InvoiceLine({
    invoiceId: invoice._id,
    description: 'Testing & QA',
    quantity: 20,
    unitPrice: 80
  });
  await line2.save();
  
  invoice.total = line1.lineTotal + line2.lineTotal;
  invoice.balanceDue = invoice.total;
  await invoice.save();
  
  console.log('Sample data created successfully!');
  console.log('Invoice:', invoice.invoiceNumber, 'Total:', invoice.total);
  console.log('View at: http://localhost:3000/invoices/' + invoice._id);
  console.log('Balance Due: $' + invoice.balanceDue);
  
  await mongoose.disconnect();
})().catch(e => { 
  console.error(e.message); 
  process.exit(1); 
});
