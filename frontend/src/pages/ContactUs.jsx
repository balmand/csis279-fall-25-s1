/**
 * Contact Us Page
 * 
 * Simple static page with contact info
 */

import React from "react";

function ContactUs() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, gray, black)",
        color: "white",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "dark blue", marginBottom: "20px" }}>
        Contact Us
      </h1>

      <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 30px" }}>
        Have any questions, feedback, or issues? We’d love to hear from you.
      </p>

      <div style={{ fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "40px" }}>
        <p><strong>Email:</strong> support@bookmanagement.com</p>
        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
        <p><strong>Address:</strong> 123 Knowledge St, Reading City, Libraryland</p>
      </div>

      <footer style={{ marginTop: "60px", fontSize: "0.9rem", color: "#ddd" }}>
        © {new Date().getFullYear()} Book Management Project — All rights reserved.
      </footer>
    </div>
  );
}

export default ContactUs;
