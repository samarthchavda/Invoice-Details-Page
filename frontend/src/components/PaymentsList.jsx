import React from 'react';

const PaymentsList = ({ payments }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!payments || payments.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No payments recorded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {payments.map((payment) => (
        <div
          key={payment._id}
          className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-gray-100 transition"
        >
          <div>
            <p className="text-sm text-gray-600">
              Payment on {formatDate(payment.paymentDate)}
            </p>
          </div>
          <p className="text-lg font-semibold text-green-600">
            ${payment.amount.toFixed(2)}
          </p>
        </div>
      ))}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex justify-between items-center mt-4">
        <p className="font-semibold text-gray-900">Total Payments</p>
        <p className="text-lg font-bold text-blue-600">
          ${payments.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default PaymentsList;
