import bcrypt from 'bcryptjs';
import { getPool } from '../utils/dbConnection.js';
import { DATABASE } from '../config/constants.js';
import { logger } from '../utils/logger.js';

export class UserLoginModel {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS ${DATABASE.TABLES.USER_LOGIN} (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX email_idx (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    try {
      const pool = await getPool();
      await pool.execute(query);
      logger.info('UserLogin table created or verified');
    } catch (error) {
      logger.error('Error creating userLogin table:', error);
      throw error;
    }
  }

  static async insertUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const query = `
      INSERT INTO ${DATABASE.TABLES.USER_LOGIN} (email, password)
      VALUES (?, ?)
    `;

    try {
      const pool = await getPool();
      const [result] = await pool.execute(query, [email, hashedPassword]);
      return result.insertId;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error(DATABASE.ERRORS.DUPLICATE_EMAIL);
      }
      throw error;
    }
  }
}