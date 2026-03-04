import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceDetailsPage from './pages/InvoiceDetailsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/invoices/:id" element={<InvoiceDetailsPage />} />
        <Route
          path="/"
          element={
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Invoice Management System
                </h1>
                <div className="space-y-4">
                  <p className="text-gray-600 mb-2">
                    Navigate to <code className="bg-gray-200 px-2 py-1 rounded">/invoices/:id</code> to view an invoice
                  </p>
                  <p className="text-sm text-gray-500">
                    Example: <code className="bg-gray-200 px-2 py-1 rounded">/invoices/&lt;invoice_id&gt;</code>
                  </p>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
