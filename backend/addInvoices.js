require('dotenv').config();
const mongoose = require('mongoose');
const Invoice = require('./models/Invoice');
const InvoiceLine = require('./models/InvoiceLine');
const Payment = require('./models/Payment');

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✓ Connected to MongoDB');
  
  // Invoice 1: INV-2026-004 - Partially Paid
  const invoice1 = new Invoice({
    invoiceNumber: 'INV-2026-004',
    customerName: 'Digital Marketing Agency',
    issueDate: new Date('2026-02-15'),
    dueDate: new Date('2026-03-15'),
    total: 0,
    amountPaid: 0,
    balanceDue: 0,
    status: 'DRAFT',
    isArchived: false,
    taxRate: 10,
    taxAmount: 0,
    subtotal: 0
  });
  await invoice1.save();
  console.log('Invoice 1 created:', invoice1.invoiceNumber);
  
  const inv1_line1 = new InvoiceLine({
    invoiceId: invoice1._id,
    description: 'Website Design & Development',
    quantity: 40,
    unitPrice: 150
  });
  await inv1_line1.save();
  
  const inv1_line2 = new InvoiceLine({
    invoiceId: invoice1._id,
    description: 'SEO Optimization',
    quantity: 15,
    unitPrice: 100
  });
  await inv1_line2.save();
  
  const inv1_line3 = new InvoiceLine({
    invoiceId: invoice1._id,
    description: 'Content Creation',
    quantity: 25,
    unitPrice: 80
  });
  await inv1_line3.save();
  
  invoice1.subtotal = inv1_line1.lineTotal + inv1_line2.lineTotal + inv1_line3.lineTotal;
  invoice1.taxAmount = invoice1.subtotal * (invoice1.taxRate / 100);
  invoice1.total = invoice1.subtotal + invoice1.taxAmount;
  invoice1.balanceDue = invoice1.total;
  await invoice1.save();
  
  // Add partial payment
  const payment1 = new Payment({
    invoiceId: invoice1._id,
    amount: 4000,
    paymentDate: new Date('2026-03-01')
  });
  await payment1.save();
  
  invoice1.amountPaid = 4000;
  invoice1.balanceDue = invoice1.total - invoice1.amountPaid;
  await invoice1.save();
  
  console.log('Invoice 1:', invoice1.invoiceNumber, 'Total:', invoice1.total, 'Paid:', invoice1.amountPaid, 'Balance:', invoice1.balanceDue);
  console.log('View at: http://localhost:3000/invoices/' + invoice1._id);
  
  // Invoice 2: INV-2026-005 - Overdue Invoice
  const invoice2 = new Invoice({
    invoiceNumber: 'INV-2026-005',
    customerName: 'Retail Solutions Ltd',
    issueDate: new Date('2026-01-10'),
    dueDate: new Date('2026-02-10'),
    total: 0,
    amountPaid: 0,
    balanceDue: 0,
    status: 'DRAFT',
    isArchived: false,
    taxRate: 8,
    taxAmount: 0,
    subtotal: 0
  });
  await invoice2.save();
  console.log('Invoice 2 created:', invoice2.invoiceNumber);
  
  const inv2_line1 = new InvoiceLine({
    invoiceId: invoice2._id,
    description: 'POS System Installation',
    quantity: 10,
    unitPrice: 200
  });
  await inv2_line1.save();
  
  const inv2_line2 = new InvoiceLine({
    invoiceId: invoice2._id,
    description: 'Staff Training',
    quantity: 8,
    unitPrice: 150
  });
  await inv2_line2.save();
  
  const inv2_line3 = new InvoiceLine({
    invoiceId: invoice2._id,
    description: 'Technical Support (3 months)',
    quantity: 3,
    unitPrice: 300
  });
  await inv2_line3.save();
  
  invoice2.subtotal = inv2_line1.lineTotal + inv2_line2.lineTotal + inv2_line3.lineTotal;
  invoice2.taxAmount = invoice2.subtotal * (invoice2.taxRate / 100);
  invoice2.total = invoice2.subtotal + invoice2.taxAmount;
  invoice2.balanceDue = invoice2.total;
  invoice2.isOverdue = true;
  await invoice2.save();
  
  console.log('Invoice 2:', invoice2.invoiceNumber, 'Total:', invoice2.total, 'Balance:', invoice2.balanceDue, 'OVERDUE!');
  console.log('View at: http://localhost:3000/invoices/' + invoice2._id);
  
  console.log('\n✅ 2 new invoices created successfully!');
  console.log('\nSummary:');
  console.log('- INV-2026-004: $' + invoice1.total.toFixed(2) + ' (Partially Paid - $' + invoice1.balanceDue.toFixed(2) + ' due)');
  console.log('- INV-2026-005: $' + invoice2.total.toFixed(2) + ' (OVERDUE - unpaid)');
  
  await mongoose.disconnect();
  console.log('\n✓ Disconnected from MongoDB');
})().catch(e => { 
  console.error('Error:', e.message); 
  process.exit(1); 
});
