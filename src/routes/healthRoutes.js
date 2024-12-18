import express from 'express';
import { checkDatabaseHealth } from '../utils/dbConnection.js';

const router = express.Router();

router.get('/health', async (req, res) => {
  try {
    const dbHealth = await checkDatabaseHealth();
    
    if (dbHealth.status === 'healthy') {
      res.json({
        status: 'ok',
        database: dbHealth
      });
    } else {
      res.status(503).json({
        status: 'error',
        message: 'Database health check failed',
        details: dbHealth
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Health check failed'
    });
  }
});

export default router;