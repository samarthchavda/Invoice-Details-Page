import React, { useState } from 'react';

const AddPaymentModal = ({ invoice, onClose, onPaymentAdded }) => {
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!amount || parseFloat(amount) <= 0) {
      setError('Payment amount must be greater than 0');
      return;
    }

    if (parseFloat(amount) > invoice.balanceDue) {
      setError(
        `Payment amount cannot exceed balance due of $${invoice.balanceDue.toFixed(2)}`
      );
      return;
    }

    try {
      setLoading(true);
      await onPaymentAdded({
        amount: parseFloat(amount),
        paymentDate,
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="bg-blue-600 px-6 py-4 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">Add Payment</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-100 transition"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Invoice Amount:</span>
              <span className="font-semibold">${invoice.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Amount Paid:</span>
              <span className="font-semibold">${invoice.amountPaid.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-blue-200 pt-2">
              <span className="text-gray-700 font-semibold">Balance Due:</span>
              <span className="font-bold text-blue-600">
                ${invoice.balanceDue.toFixed(2)}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Amount *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={invoice.balanceDue}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="0.00"
                  disabled={loading}
                  required
                />
              </div>
              {amount && (
                <p className="text-xs text-gray-500 mt-1">
                  Max amount: ${invoice.balanceDue.toFixed(2)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Date *
              </label>
              <input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                disabled={loading}
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={loading || !amount}
              >
                {loading ? 'Adding...' : 'Add Payment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentModal;
