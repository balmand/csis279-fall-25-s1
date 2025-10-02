/**
 * Simple App Component
 * 
 * This demonstrates basic React app structure
 */

import React from 'react';
import BooksPage from './pages/BooksPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Book Management System</h1>
        <p>Learn Modularity, Clean Code & Reusability</p>
      </header>
      
      <main className="App-main">
        <BooksPage />
      </main>
      
      <footer className="App-footer">
        <p>Simple Book Management App - Educational Project</p>
      </footer>
    </div>
  );
}

export default App;