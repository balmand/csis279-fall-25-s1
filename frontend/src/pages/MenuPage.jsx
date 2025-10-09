import React from "react";
import { Link } from "react-router-dom";

export default function MenuBar() {
    return (
        <div style={styles.menuBar}>
            <Link to="/customers" style={styles.link}>
                <button style={styles.button}>Customers</button>
            </Link>

            <Link to="/books" style={styles.link}>
                <button style={styles.button}>Books</button>
            </Link>

            <Link to="/" style={styles.link}>
                <button style={styles.button}>Home</button>
            </Link>

            <Link to="/contact" style={styles.link}>
                <button style={styles.button}>Contact us</button>
            </Link>
        </div>
    );
}

const styles = {
    menuBar: {
        display: "flex",
        gap: "12px",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        padding: "10px 20px",
        fontSize: "1rem",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#619ad6ff",
        color: "white",
        cursor: "pointer",
        fontWeight: "bold",

        transition: "background-color 0.3s ease",
    },
    link: {
        textDecoration: "none",
    },
};
