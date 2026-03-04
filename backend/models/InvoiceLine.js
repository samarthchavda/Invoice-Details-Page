const mongoose = require('mongoose');

const invoiceLineSchema = new mongoose.Schema({
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invoice',
      required: [true, 'Invoice ID is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    unitPrice: {
      type: Number,
      required: [true, 'Unit price is required'],
      min: [0, 'Unit price cannot be negative'],
    },
    lineTotal: {
      type: Number,
      default: 0,
      min: 0,
    },
  });

invoiceLineSchema.pre('save', function (next) {
  this.lineTotal = this.quantity * this.unitPrice;
  next();
});

invoiceLineSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

invoiceLineSchema.set('toJSON', { virtuals: true });
invoiceLineSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('InvoiceLine', invoiceLineSchema);
