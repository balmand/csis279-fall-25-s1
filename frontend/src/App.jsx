/**
 * Simple App Component
 * 
 * This demonstrates basic React app structure
 */

import React from 'react';
import BooksPage from './pages/BooksPage';
import CustomersPage from './pages/CustomersPage';
import MenuPage from './pages/MenuPage';
import { Link, Route, Routes } from 'react-router-dom';
import ContactPage from './pages/ContactPage';


import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Book Management System</h1>
        <p>Learn Modularity, Clean Code & Reusability</p>
        <MenuPage></MenuPage>
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