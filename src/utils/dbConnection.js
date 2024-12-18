import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { logger } from './logger.js';

dotenv.config();

let pool = null;

export async function initializeDatabase() {
  try {
    if (!pool) {
      validateEnvVariables();
      pool = createPool();
    }
    await validateConnection();
    return pool;
  } catch (error) {
    logger.error('Failed to initialize database:', error);
    throw error;
  }
}

function validateEnvVariables() {
  const required = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_PORT'];
  const missing = required.filter(variable => !process.env[variable]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

function createPool() {
  return mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  });
}

async function validateConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.ping();
    logger.info('Database connection successful');
  } catch (error) {
    logger.error('Database connection failed');
    throw error;
  } finally {
    if (conn) conn.release();
  }
}

export async function getPool() {
  if (!pool) {
    await initializeDatabase();
  }
  return pool;
}

export async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
    logger.info('Database connection closed');
  }
}

export async function checkDatabaseHealth() {
  try {
    const connection = await getPool();
    await connection.query('SELECT 1');
    return {
      status: 'healthy',
      message: 'Database connection is working properly'
    };
  } catch (error) {
    logger.error('Database health check failed:', error);
    return {
      status: 'unhealthy',
      message: 'Database connection failed',
      error: error.message
    };
  }
}