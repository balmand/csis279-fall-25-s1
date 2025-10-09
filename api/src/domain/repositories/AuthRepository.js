import { pool } from "../../config/db.js";

export class AuthRepository {
    async findByEmail(email) {
        const { rows } = await pool.query(
            `SELECT id, name, email, phone, address, role, password_hash
       FROM customers
       WHERE lower(email) = lower($1)`,
            [email]
        );
        return rows[0] || null;
    }

    async createCustomerWithPassword({ name, email, phone, address, passwordHash, role = 'user' }) {
        const { rows } = await pool.query(
            `INSERT INTO customers (name, email, phone, address, password_hash, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, email, phone, address, role`,
            [name, email, phone, address, passwordHash, role]
        );
        return rows[0];
    }

    async findByIdPublic(id) {
        const { rows } = await pool.query(
            `SELECT id, name, email, phone, address, role
       FROM customers
       WHERE id = $1`,
            [id]
        );
        return rows[0] || null;
    }
};