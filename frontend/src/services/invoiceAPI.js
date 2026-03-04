import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Invoice API endpoints
export const invoiceAPI = {
  // Get invoice details with line items and payments
  getInvoiceDetails: (id) => {
    return apiClient.get(`/invoices/${id}`);
  },

  // Add payment to invoice
  addPayment: (invoiceId, paymentData) => {
    return apiClient.post(`/invoices/${invoiceId}/payments`, paymentData);
  },

  // Archive invoice
  archiveInvoice: (invoiceId) => {
    return apiClient.post('/invoices/archive', { id: invoiceId });
  },

  // Restore invoice
  restoreInvoice: (invoiceId) => {
    return apiClient.post('/invoices/restore', { id: invoiceId });
  },
};

export default apiClient;
