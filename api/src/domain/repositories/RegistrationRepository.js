import { pool } from "../../config/db.js";
import { Registration } from "../entities/Registration.js";

export class RegistrationRepository {
    async create({ customerId, bookId, date, dueDate = null, status = "active" }) {
        const sql = `
            INSERT INTO registrations (customer_id, book_id, date, due_date, status)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, customer_id, book_id, date, due_date, status, created_at, updated_at;
        `;
        const { rows } = await pool.query(sql, [customerId, bookId, date, dueDate, status]);
        return new Registration(rows[0]);
    }

    async update(id, { customerId, bookId, date, dueDate = null, status }) {
        const sql = `
            UPDATE registrations
            SET customer_id = $1, book_id = $2, date = $3, due_date = $4, status = $5, updated_at = NOW()
            WHERE id = $6
            RETURNING id, customer_id, book_id, date, due_date, status, created_at, updated_at;
        `;
        const { rows } = await pool.query(sql, [customerId, bookId, date, dueDate, status, id]);
        return rows[0] ? new Registration(rows[0]) : null;
    }

    async findAll() {
        const sql = `
            SELECT id, customer_id, book_id, date, due_date, status, created_at, updated_at
            FROM registrations
            ORDER BY id DESC;
        `;
        const { rows } = await pool.query(sql);
        return rows.map(r => new Registration(r));
    }

    async findById(id) {
        const sql = `
            SELECT id, customer_id, book_id, date, due_date, status, created_at, updated_at
            FROM registrations
            WHERE id = $1;
        `;
        const { rows } = await pool.query(sql, [id]);
        return rows[0] ? new Registration(rows[0]) : null;
    }

    async findByCustomerId(customerId) {
        const sql = `
            SELECT id, customer_id, book_id, date, due_date, status, created_at, updated_at
            FROM registrations
            WHERE customer_id = $1
            ORDER BY date DESC;
        `;
        const { rows } = await pool.query(sql, [customerId]);
        return rows.map(r => new Registration(r));
    }

    
    async findByBookId(bookId) {
        const sql = `
            SELECT id, customer_id, book_id, date, due_date, status, created_at, updated_at
            FROM registrations
            WHERE book_id = $1
            ORDER BY date DESC;
        `;
        const { rows } = await pool.query(sql, [bookId]);
        return rows.map(r => new Registration(r));
    }

    async delete(id) {
        const { rowCount } = await pool.query('DELETE FROM registrations WHERE id = $1', [id]);
        return rowCount > 0;
    }
}
