const Invoice = require('../models/Invoice');
const InvoiceLine = require('../models/InvoiceLine');
const Payment = require('../models/Payment');

exports.getInvoiceDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findById(id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    const lineItems = await InvoiceLine.find({ invoiceId: id });
    const payments = await Payment.find({ invoiceId: id }).sort({ paymentDate: -1 });
    
    const total = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);
    if (total !== invoice.total) {
      invoice.total = total;
      invoice.balanceDue = total - invoice.amountPaid;
      await invoice.save();
    }

    res.json({
      invoice,
      lineItems,
      payments,
      total: invoice.total,
      amountPaid: invoice.amountPaid,
      balanceDue: invoice.balanceDue,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, paymentDate } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Amount must be greater than 0' });
    }

    const invoice = await Invoice.findById(id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    if (amount > invoice.balanceDue) {
      return res.status(400).json({ 
        error: `Amount exceeds balance due of $${invoice.balanceDue.toFixed(2)}` 
      });
    }

    const payment = await Payment.create({
      invoiceId: id,
      amount,
      paymentDate: paymentDate || Date.now(),
    });

    invoice.amountPaid += amount;
    invoice.balanceDue = invoice.total - invoice.amountPaid;
    if (invoice.balanceDue === 0) invoice.status = 'PAID';
    await invoice.save();

    res.status(201).json({ payment, invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.archiveInvoice = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'Invoice ID required' });

    const invoice = await Invoice.findByIdAndUpdate(
      id,
      { isArchived: true },
      { new: true }
    );

    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    res.json({ invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.restoreInvoice = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'Invoice ID required' });

    const invoice = await Invoice.findByIdAndUpdate(
      id,
      { isArchived: false },
      { new: true }
    );

    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    res.json({ invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
