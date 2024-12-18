import express from 'express';
import { register } from '../controllers/authController.js';
import { registerValidator } from '../validators/userValidator.js';

const router = express.Router();

router.post('/register', registerValidator, register);

export default router;