const PDFDocument = require('pdfkit');
const Invoice = require('../models/Invoice');
const InvoiceLine = require('../models/InvoiceLine');
const Payment = require('../models/Payment');

exports.generatePDF = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findById(id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    const lineItems = await InvoiceLine.find({ invoiceId: id });
    const payments = await Payment.find({ invoiceId: id }).sort({ paymentDate: -1 });

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice.invoiceNumber}.pdf`);

    doc.pipe(res);

    doc.fontSize(20).text('INVOICE', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Invoice Number: ${invoice.invoiceNumber}`);
    doc.text(`Customer: ${invoice.customerName}`);
    doc.text(`Issue Date: ${new Date(invoice.issueDate).toLocaleDateString()}`);
    doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`);
    doc.text(`Status: ${invoice.status}`);
    doc.moveDown();

    doc.fontSize(14).text('Line Items:', { underline: true });
    doc.moveDown(0.5);

    lineItems.forEach((item, index) => {
      doc.fontSize(10)
        .text(`${index + 1}. ${item.description}`)
        .text(`   Qty: ${item.quantity} × $${item.unitPrice.toFixed(2)} = $${item.lineTotal.toFixed(2)}`);
      doc.moveDown(0.5);
    });

    doc.moveDown();
    doc.fontSize(12)
      .text(`Total: $${invoice.total.toFixed(2)}`, { align: 'right' })
      .text(`Amount Paid: $${invoice.amountPaid.toFixed(2)}`, { align: 'right' })
      .text(`Balance Due: $${invoice.balanceDue.toFixed(2)}`, { align: 'right', bold: true });

    if (payments.length > 0) {
      doc.moveDown();
      doc.fontSize(14).text('Payment History:', { underline: true });
      doc.moveDown(0.5);

      payments.forEach((payment, index) => {
        doc.fontSize(10).text(
          `${index + 1}. $${payment.amount.toFixed(2)} - ${new Date(payment.paymentDate).toLocaleDateString()}`
        );
      });
    }

    doc.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
