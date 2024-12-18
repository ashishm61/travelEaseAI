import dotenv from 'dotenv';
import { initializeDatabase, closePool } from '../utils/dbConnection.js';
import { UserLoginModel } from '../models/userLoginModel.js';
import { logger } from '../utils/logger.js';

dotenv.config();

async function insertTestUser() {
  try {
    await initializeDatabase();
    
    const email = 'test@example.com';
    const password = 'SecurePass123!';
    
    const userId = await UserLoginModel.insertUser(email, password);
    logger.info(`Test user created successfully with ID: ${userId}`);
  } catch (error) {
    logger.error('Failed to insert test user:', error);
    if (error.code === 'ECONNREFUSED') {
      logger.error('Make sure MySQL is running and the connection details are correct');
    }
    process.exit(1);
  } finally {
    await closePool();
  }
}

insertTestUser();