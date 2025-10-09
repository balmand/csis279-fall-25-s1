/**
 * Simple App Component
 * 
 * This demonstrates basic React app structure
 */

import React from 'react';
import BooksPage from './pages/BooksPage';
import CustomersPage from './pages/CustomersPage';
import { Link, Route, Routes } from 'react-router-dom';
import ContactPage from './pages/ContactPage';


import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Book Management System</h1>
        <p>Learn Modularity, Clean Code & Reusability</p>
        <Link to="/">Home</Link> |
        <Link to="/books">Books</Link> |
        <Link to="/customers">Customers</Link>
        <Link to="/contact">Contact Us</Link>
      </header>

      <main className="App-main">
        <Routes>
          <Route path="/" element={<><BooksPage /><CustomersPage /></>} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/contact" element={<ContactPage />} />

        </Routes>
      </main>

      <footer className="App-footer">
        <p>Simple Book Management App - Educational Project</p>
      </footer>
    </div>
  );
}

export default App;