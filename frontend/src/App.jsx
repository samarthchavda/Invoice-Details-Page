import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceListPage from './pages/InvoiceListPage';
import InvoiceDetailsPage from './pages/InvoiceDetailsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvoiceListPage />} />
        <Route path="/invoices/:id" element={<InvoiceDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
