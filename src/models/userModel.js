import { pool } from '../config/database.js';
import bcrypt from 'bcryptjs';

class UserModel {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX email_idx (email)
      )
    `;

    try {
      await pool.execute(query);
      console.log('Users table created or already exists');
    } catch (error) {
      console.error('Error creating users table:', error);
      throw error;
    }
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  static async create(email, password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const [result] = await pool.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );
    
    return result.insertId;
  }
}

export default UserModel;