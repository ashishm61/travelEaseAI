import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import csrf from 'csurf';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { checkDatabaseHealth } from './utils/dbConnection.js';
import authRoutes from './routes/authRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', healthRoutes);

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;
let serverInstance = null;

async function startServer() {
  try {
    await checkDatabaseHealth();
    serverInstance = app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => gracefulShutdown());
    process.on('SIGINT', () => gracefulShutdown());
  } catch (error) {
    console.error('✗ Failed to start server:', error);
    process.exit(1);
  }
}

async function gracefulShutdown() {
  console.log('Received shutdown signal');
  
  if (serverInstance) {
    serverInstance.close(() => {
      console.log('Server closed');
      pool.end(() => {
        console.log('Database pool closed');
        process.exit(0);
      });
    });
  }
}

startServer();