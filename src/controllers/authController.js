import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { getPool } from '../utils/dbConnection.js';

export const register = async (req, res, next) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
    }

    const { first_name, last_name, email, phone_number, nationality, password } = req.body;

    // Get database connection
    const pool = await getPool();

    // Check if user already exists
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        status: 'error',
        message: 'Email already registered'
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const [result] = await pool.execute(
      'INSERT INTO users (first_name, last_name, email, nationality, phone_number, password_hash) VALUES (?, ?, ?, ?, ?, ?)',
      [first_name, last_name, email, nationality, phone_number, hashedPassword]
    );

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: { userId: result.insertId }
    });
  } catch (error) {
    console.error('Registration error:', error);
    next(error);
  }
};