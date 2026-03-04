import React from 'react';

const InvoiceHeader = ({ invoice, onArchive, onRestore, onDownloadPDF }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadgeColor = (status) => {
    return status === 'PAID'
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 sm:px-8 py-8 text-white">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Invoice Details</h1>
          <p className="text-blue-100">Invoice #{invoice.invoiceNumber}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onDownloadPDF}
            className="px-4 py-2 bg-white hover:bg-gray-100 text-blue-600 rounded-lg font-medium transition flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </button>
          {invoice.isArchived ? (
            <button
              onClick={onRestore}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition"
            >
              Restore
            </button>
          ) : (
            <button
              onClick={onArchive}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition"
            >
              Archive
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <p className="text-blue-100 text-sm mb-1">Customer Name</p>
          <p className="text-lg font-semibold">{invoice.customerName}</p>
        </div>
        <div>
          <p className="text-blue-100 text-sm mb-1">Status</p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(
              invoice.status
            )}`}
          >
            {invoice.status}
          </span>
        </div>
        <div>
          <p className="text-blue-100 text-sm mb-1">Issue Date</p>
          <p className="text-lg font-semibold">{formatDate(invoice.issueDate)}</p>
        </div>
        <div>
          <p className="text-blue-100 text-sm mb-1">Due Date</p>
          <p className="text-lg font-semibold">{formatDate(invoice.dueDate)}</p>
        </div>
      </div>

      {invoice.isArchived && (
        <div className="mt-4 bg-yellow-500 bg-opacity-20 border border-yellow-400 rounded-lg p-3">
          <p className="text-sm font-medium">This invoice is archived</p>
        </div>
      )}
    </div>
  );
};

export default InvoiceHeader;
