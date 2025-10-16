/**
 * Simple Book Card Component
 * 
 * This component demonstrates:
 * - Reusable UI component
 * - Props handling
 * - Event handling
 */

import React from 'react';

export function BookCard({ book, onEdit, onDelete, onView }) {
    
    const addToCard = () => {
         let cart = JSON.parse(localStorage.getItem("cart"));
         if(!cart){
            cart = [];
         }
         cart.push({...book, qty: 1});
         localStorage.setItem("cart", JSON.stringify(cart));
         alert("Added to Cart");
    }
    return (
        <div className="book-card">
            <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">By {book.author}</p>
                <p className="book-year">Published: {book.year}</p>
                <p className="book-price">${book.price}</p>
            </div>
            
            <div className="book-actions">
                {onView && (
                    <button 
                        className="btn btn-primary"
                        onClick={() => onView(book)}
                    >
                        View
                    </button>
                )}
                
                {onEdit && (
                    <button 
                        className="btn btn-secondary"
                        onClick={() => onEdit(book)}
                    >
                        Edit
                    </button>
                )}
                
                {onDelete && (
                    <button 
                        className="btn btn-danger"
                        onClick={() => onDelete(book.id)}
                    >
                        Delete
                    </button>
                )}
                <button className="btn btn-success" onClick={()=> addToCard()}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default BookCard;
