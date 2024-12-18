import dotenv from 'dotenv';
import { initializeDatabase, closePool } from '../utils/dbConnection.js';
import { UserLoginModel } from '../models/userLoginModel.js';
import { logger } from '../utils/logger.js';

dotenv.config();

async function setupDatabase() {
  try {
    const pool = await initializeDatabase();
    
    // Create database if it doesn't exist
    await pool.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    logger.info(`Database '${process.env.DB_NAME}' created or verified`);
    
    // Switch to the database
    await pool.query(`USE ${process.env.DB_NAME}`);
    
    // Create tables
    await UserLoginModel.createTable();
    
    logger.info('Database setup completed successfully');
  } catch (error) {
    logger.error('Database setup failed:', error);
    process.exit(1);
  } finally {
    await closePool();
  }
}

setupDatabase();