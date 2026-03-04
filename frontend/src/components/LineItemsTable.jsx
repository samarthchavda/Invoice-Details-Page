import React from 'react';

const LineItemsTable = ({ lineItems }) => {
  if (!lineItems || lineItems.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No line items</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Description
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
              Quantity
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
              Unit Price
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
              Line Total
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {lineItems.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">
                {item.description}
              </td>
              <td className="px-6 py-4 text-right text-sm text-gray-900">
                {item.quantity}
              </td>
              <td className="px-6 py-4 text-right text-sm text-gray-900">
                ${item.unitPrice.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                ${item.lineTotal.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LineItemsTable;
