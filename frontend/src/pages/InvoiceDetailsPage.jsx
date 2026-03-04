import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { invoiceAPI } from '../services/invoiceAPI';
import InvoiceHeader from '../components/InvoiceHeader';
import LineItemsTable from '../components/LineItemsTable';
import TotalsSection from '../components/TotalsSection';
import PaymentsList from '../components/PaymentsList';
import AddPaymentModal from '../components/AddPaymentModal';

const InvoiceDetailsPage = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [lineItems, setLineItems] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);

  useEffect(() => {
    fetchInvoiceDetails();
  }, [id]);

  const fetchInvoiceDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await invoiceAPI.getInvoiceDetails(id);
      setInvoice(response.data.invoice);
      setLineItems(response.data.lineItems);
      setPayments(response.data.payments);
    } catch (err) {
      console.error('Error fetching invoice details:', err);
      setError(err.response?.data?.error || 'Failed to fetch invoice details');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentAdded = async (paymentData) => {
    try {
      await invoiceAPI.addPayment(id, paymentData);
      setShowAddPaymentModal(false);
      fetchInvoiceDetails();
    } catch (err) {
      console.error('Error adding payment:', err);
      throw err;
    }
  };

  const handleArchive = async () => {
    try {
      await invoiceAPI.archiveInvoice(id);
      fetchInvoiceDetails();
    } catch (err) {
      console.error('Error archiving invoice:', err);
      setError('Failed to archive invoice');
    }
  };

  const handleRestore = async () => {
    try {
      await invoiceAPI.restoreInvoice(id);
      fetchInvoiceDetails();
    } catch (err) {
      console.error('Error restoring invoice:', err);
      setError('Failed to restore invoice');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading invoice details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Invoice not found</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <InvoiceHeader
            invoice={invoice}
            onArchive={handleArchive}
            onRestore={handleRestore}
          />

          <div className="p-6 sm:p-8">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Line Items
              </h2>
              <LineItemsTable lineItems={lineItems} />
            </section>

            <section className="mb-8">
              <TotalsSection invoice={invoice} />
            </section>

            {invoice.balanceDue > 0 && !invoice.isArchived && (
              <div className="mb-8">
                <button
                  onClick={() => setShowAddPaymentModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Payment
                </button>
              </div>
            )}

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Payments
              </h2>
              <PaymentsList payments={payments} />
            </section>
          </div>
      </motion.div>
    </motion.div>
      {showAddPaymentModal && (
        <AddPaymentModal
          invoice={invoice}
          onClose={() => setShowAddPaymentModal(false)}
          onPaymentAdded={handlePaymentAdded}
        />
      )}
    </div>
  );
};

export default InvoiceDetailsPage;
