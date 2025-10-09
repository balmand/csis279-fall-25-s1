import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import {pool} from '../config/db.js';

export class forgotPasswordController {
  constructor() {
    this.jwtSecret = process.env.JWT;
    this.emailUser = process.env.EMAIL_USER || 'diaaghamrawi2@gmail.com';
    this.emailPass = process.env.EMAIL_PASS || 'ohsx dvww ctlv hopa '; // Ideally store in .env
  }

  requestPasswordReset = async (req, res, next) => {
    const { email } = req.body;

    try {
      console.log('🔍 Looking up customer by email...');
      const result = await pool.query('SELECT * FROM customers WHERE email = $1', [email]);
      const user = result.rows[0];

      if (!user) return res.status(404).json({ message: "User doesn't exist" });

      // Use user.id instead of _id (Postgres uses "id")
      const secret = this.jwtSecret + user.password;
      const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });

      const resetURL = `http://localhost:4000/api/auth/resetPassword?id=${user.id}&token=${token}`;

      console.log('Sending reset email...');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: this.emailUser,
          pass: this.emailPass,
        },
      });

      const mailOptions = {
        to: user.email,
        from: this.emailUser,
        subject: 'Password Reset Request',
        text: `
        You requested a password reset.
        Click here to reset your password:
        ${resetURL}

        If you didn’t request this, ignore this email.
`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'Password reset link sent' });
    } catch (error) {
      console.error('Error in requestPasswordReset:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

  // ------------------------------
  // RESET PASSWORD
  // ------------------------------
  resetPassword = async (req, res, next) => {
    const { id, token } = req.query;
    const { password } = req.body;

    try {
      // Get the user by ID from PostgreSQL
      const result = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
      const user = result.rows[0];
      if (!user) return res.status(400).json({ message: "User doesn't exist!" });

      const secret = this.jwtSecret + user.password;

      // Verify token
      jwt.verify(token, secret);

      // Hash the new password
      const encryptedPassword = await bcrypt.hash(password, 10);

      // Update in PostgreSQL
      await pool.query('UPDATE customers SET password = $1 WHERE id = $2', [encryptedPassword, id]);

      res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
      console.error('Error in resetPassword:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
}
