import React from 'react';

const TotalsSection = ({ invoice }) => {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border-l-4 border-blue-600 pl-4">
          <p className="text-gray-600 text-sm mb-1">Total Amount</p>
          <p className="text-2xl font-bold text-gray-900">
            ${invoice.total.toFixed(2)}
          </p>
        </div>

        <div className="border-l-4 border-green-600 pl-4">
          <p className="text-gray-600 text-sm mb-1">Amount Paid</p>
          <p className="text-2xl font-bold text-gray-900">
            ${invoice.amountPaid.toFixed(2)}
          </p>
        </div>

        <div
          className={`border-l-4 pl-4 ${
            invoice.balanceDue === 0
              ? 'border-green-600'
              : 'border-orange-600'
          }`}
        >
          <p className="text-gray-600 text-sm mb-1">Balance Due</p>
          <p
            className={`text-2xl font-bold ${
              invoice.balanceDue === 0
                ? 'text-green-600'
                : 'text-orange-600'
            }`}
          >
            ${invoice.balanceDue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Payment Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-gray-700">Payment Progress</p>
          <p className="text-sm text-gray-600">
            {invoice.total > 0
              ? ((invoice.amountPaid / invoice.total) * 100).toFixed(0)
              : 0}
            %
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              invoice.balanceDue === 0
                ? 'bg-green-600'
                : 'bg-blue-600'
            }`}
            style={{
              width: `${
                invoice.total > 0
                  ? (invoice.amountPaid / invoice.total) * 100
                  : 0
              }%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TotalsSection;
