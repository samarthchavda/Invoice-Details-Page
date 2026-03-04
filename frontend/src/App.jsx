import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceListPage from './pages/InvoiceListPage';
import InvoiceDetailsPage from './pages/InvoiceDetailsPage';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvoiceListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/invoices/:id" element={<InvoiceDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
