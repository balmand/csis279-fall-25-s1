import { pool } from "../../config/db.js";
import { Customer } from "../entities/Customer.js";

export class RegistrationRepository {
  async create({ name, email, phone, address, passwordHash }) {
    const { rows } = await pool.query(
      `INSERT INTO customers (name, email, phone, address, password, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING id, name, email, phone, address, created_at, updated_at`,
      [name, email, phone, address, password]
    );
    return new Customer(rows[0]);
  }
}
