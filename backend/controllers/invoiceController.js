const Invoice = require('../models/Invoice');
const InvoiceLine = require('../models/InvoiceLine');
const Payment = require('../models/Payment');

exports.getInvoiceDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid invoice ID format',
      });
    }

    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found',
      });
    }

    const lineItems = await InvoiceLine.find({ invoiceId: id });
    const payments = await Payment.find({ invoiceId: id }).sort({
      paymentDate: -1,
    });
    const calculatedTotal = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);
    if (calculatedTotal !== invoice.total) {
      invoice.total = calculatedTotal;
      invoice.balanceDue = calculatedTotal - invoice.amountPaid;
      await invoice.save();
    }

    res.status(200).json({
      success: true,
      data: {
        invoice,
        lineItems,
        payments,
        total: invoice.total,
        amountPaid: invoice.amountPaid,
        balanceDue: invoice.balanceDue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching invoice details',
      error: error.message,
    });
  }
};

exports.addPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, paymentDate } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Payment amount must be greater than 0',
      });
    }

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid invoice ID format',
      });
    }

    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found',
      });
    }

    if (amount > invoice.balanceDue) {
      return res.status(400).json({
        success: false,
        message: `Payment amount cannot exceed balance due of $${invoice.balanceDue.toFixed(
          2
        )}`,
      });
    }

    const payment = new Payment({
      invoiceId: id,
      amount,
      paymentDate: paymentDate || Date.now(),
    });

    await payment.save();

    invoice.amountPaid += amount;
    invoice.balanceDue = invoice.total - invoice.amountPaid;

    if (invoice.balanceDue === 0) {
      invoice.status = 'PAID';
    }

    await invoice.save();

    res.status(201).json({
      success: true,
      message: 'Payment added successfully',
      data: {
        payment,
        invoice,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding payment',
      error: error.message,
    });
  }
};

exports.archiveInvoice = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid invoice ID format',
      });
    }

    const invoice = await Invoice.findByIdAndUpdate(
      id,
      { isArchived: true },
      { new: true, runValidators: true }
    );

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Invoice archived successfully',
      data: { invoice },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error archiving invoice',
      error: error.message,
    });
  }
};

exports.restoreInvoice = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid invoice ID format',
      });
    }

    const invoice = await Invoice.findByIdAndUpdate(
      id,
      { isArchived: false },
      { new: true, runValidators: true }
    );

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Invoice restored successfully',
      data: { invoice },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error restoring invoice',
      error: error.message,
    });
  }
};
