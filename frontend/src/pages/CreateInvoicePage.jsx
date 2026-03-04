import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { invoiceAPI } from '../services/invoiceAPI';
import InvoicePreview from '../components/InvoicePreview';

const CreateInvoicePage = () => {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    customerName: '',
    invoiceNumber: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    address: '',
    currency: 'USD',
    lineItems: [
      { description: '', quantity: 1, unitPrice: 0 }
    ]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLineItemChange = (index, field, value) => {
    const newLineItems = [...formData.lineItems];
    newLineItems[index] = {
      ...newLineItems[index],
      [field]: field === 'description' ? value : parseFloat(value) || 0
    };
    setFormData(prev => ({
      ...prev,
      lineItems: newLineItems
    }));
  };

  const addLineItem = () => {
    setFormData(prev => ({
      ...prev,
      lineItems: [
        ...prev.lineItems,
        { description: '', quantity: 1, unitPrice: 0 }
      ]
    }));
  };

  const removeLineItem = (index) => {
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter((_, i) => i !== index)
    }));
  };

  const calculateLineTotal = (quantity, unitPrice) => {
    return quantity * unitPrice;
  };

  const calculateSubtotal = () => {
    return formData.lineItems.reduce((sum, item) => {
      return sum + calculateLineTotal(item.quantity, item.unitPrice);
    }, 0);
  };

  const handleSaveAsDraft = async () => {
    if (!formData.customerName || !formData.invoiceNumber) {
      setError('Please fill in customer name and invoice number');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await invoiceAPI.createInvoice({
        ...formData,
        status: 'DRAFT'
      });
      setSuccess('Invoice saved as draft!');
      setTimeout(() => {
        navigate(`/invoices/${response.data.data.invoice._id}`);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save invoice');
    } finally {
      setLoading(false);
    }
  };

  const handleSendInvoice = async () => {
    if (!formData.customerName || !formData.invoiceNumber) {
      setError('Please fill in customer name and invoice number');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await invoiceAPI.createInvoice({
        ...formData,
        status: 'SENT'
      });
      setSuccess('Invoice sent successfully!');
      setTimeout(() => {
        navigate(`/invoices/${response.data.data.invoice._id}`);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send invoice');
    } finally {
      setLoading(false);
    }
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">New Invoice</h1>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm font-medium text-gray-700">Show Preview</span>
                <input
                  type="checkbox"
                  checked={showPreview}
                  onChange={(e) => setShowPreview(e.target.checked)}
                  className="w-5 h-5"
                />
              </label>
              <div className="flex gap-3">
                <button
                  onClick={handleSaveAsDraft}
                  disabled={loading}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:bg-gray-100"
                >
                  Save as Draft
                </button>
                <button
                  onClick={handleSendInvoice}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                >
                  {loading ? 'Processing...' : 'Send Invoice'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-600">{success}</p>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <form className="space-y-6">
              {/* Invoice Details Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Invoice details</h2>
                
                {/* Bill To */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bill to
                  </label>
                  <select
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select or add customer</option>
                    <option value="Acme Enterprise">Acme Enterprise</option>
                    <option value="Tech Solutions Inc">Tech Solutions Inc</option>
                    <option value="Global Services Ltd">Global Services Ltd</option>
                  </select>
                </div>

                {/* Or Custom Input */}
                <input
                  type="text"
                  placeholder="Or enter customer name"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  name="customerName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-500 mb-4"
                />

                {/* Invoice Number & Due Date Row */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Invoice number
                    </label>
                    <input
                      type="text"
                      name="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={handleInputChange}
                      placeholder="INV-001"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Due date
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Customer address"
                  />
                </div>
              </div>

              {/* Line Items Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Invoice items</h2>
                </div>

                {/* Currency */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="USD">US Dollar</option>
                    <option value="EUR">Euro</option>
                    <option value="GBP">British Pound</option>
                    <option value="INR">Indian Rupee</option>
                  </select>
                </div>

                {/* Items Table */}
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Item
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 w-20">
                          QTY
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 w-24">
                          Rate
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 w-24">
                          Total
                        </th>
                        <th className="px-4 py-3 w-8"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.lineItems.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) =>
                                handleLineItemChange(index, 'description', e.target.value)
                              }
                              placeholder="Item description"
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                handleLineItemChange(index, 'quantity', e.target.value)
                              }
                              min="1"
                              className="w-full px-2 py-1 border border-gray-300 rounded text-center text-sm"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) =>
                                handleLineItemChange(index, 'unitPrice', e.target.value)
                              }
                              min="0"
                              step="0.01"
                              className="w-full px-2 py-1 border border-gray-300 rounded text-right text-sm"
                            />
                          </td>
                          <td className="px-4 py-3 text-right text-sm font-medium">
                            {calculateLineTotal(item.quantity, item.unitPrice).toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              type="button"
                              onClick={() => removeLineItem(index)}
                              className="text-red-500 hover:text-red-700 text-lg"
                            >
                              ×
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add Item Button */}
                <button
                  type="button"
                  onClick={addLineItem}
                  className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  + Add Item
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - Preview */}
          {showPreview && (
            <div className="bg-white rounded-lg shadow-md p-8">
              <InvoicePreview
                invoice={{
                  invoiceNumber: formData.invoiceNumber || 'INV-001',
                  customerName: formData.customerName || 'Customer Name',
                  issueDate: formData.issueDate,
                  dueDate: formData.dueDate,
                  address: formData.address,
                  currency: formData.currency
                }}
                lineItems={formData.lineItems}
                subtotal={subtotal}
                tax={tax}
                total={total}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateInvoicePage;
