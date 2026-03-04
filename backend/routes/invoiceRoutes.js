const express = require('express');
const router = express.Router();
const {
  getInvoiceDetails,
  addPayment,
  archiveInvoice,
  restoreInvoice,
} = require('../controllers/invoiceController');

router.get('/:id', getInvoiceDetails);
router.post('/:id/payments', addPayment);
router.post('/archive', archiveInvoice);
router.post('/restore', restoreInvoice);

module.exports = router;
