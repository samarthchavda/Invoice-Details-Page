import React from 'react';

const InvoicePreview = ({ invoice, lineItems, subtotal, tax, total }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCurrencySymbol = (currency) => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      INR: '₹'
    };
    return symbols[currency] || '$';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoice</h1>
          <p className="text-gray-600 text-sm mt-1">
            Invoice Number: <span className="font-semibold">{invoice.invoiceNumber}</span>
          </p>
        </div>
        <div className="text-right">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-green-600 text-xl">✓</span>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b">
        <div>
          <p className="text-gray-600 text-sm mb-1">Billed to</p>
          <p className="font-semibold text-gray-900">{invoice.customerName}</p>
          <p className="text-gray-600 text-sm">{invoice.address}</p>
        </div>
        <div className="text-right">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm mb-1">Due date</p>
              <p className="font-semibold text-gray-900">
                {formatDate(invoice.dueDate)}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Issue date</p>
              <p className="font-semibold text-gray-900">
                {formatDate(invoice.issueDate)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Items</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900">QTY</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">Rate</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">Total</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-900">
                  {item.description || 'Item'}
                </td>
                <td className="text-center py-3 px-4 text-gray-900">
                  {item.quantity}
                </td>
                <td className="text-right py-3 px-4 text-gray-900">
                  {getCurrencySymbol(invoice.currency)}{item.unitPrice.toFixed(2)}
                </td>
                <td className="text-right py-3 px-4 font-semibold text-gray-900">
                  {getCurrencySymbol(invoice.currency)}
                  {(item.quantity * item.unitPrice).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between py-2 border-t-2 border-gray-300 mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-gray-900">
              {getCurrencySymbol(invoice.currency)}{subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-2 mb-2">
            <span className="text-gray-600">Discount</span>
            <span className="font-semibold text-gray-900">
              {getCurrencySymbol(invoice.currency)}0
            </span>
          </div>
          <div className="flex justify-between py-2 border-b-2 border-gray-300 mb-2">
            <span className="text-gray-600">Tax</span>
            <span className="font-semibold text-gray-900">
              {getCurrencySymbol(invoice.currency)}{tax.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-3 bg-gray-50 px-4 rounded">
            <span className="font-bold text-gray-900">Total</span>
            <span className="font-bold text-gray-900 text-lg">
              {getCurrencySymbol(invoice.currency)}{total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="text-center text-gray-600 text-sm">
        <p>Thank you for your business!</p>
      </div>
    </div>
  );
};

export default InvoicePreview;
