import { Router } from 'express';
import { AuthRepository } from '../domain/repositories/AuthRepository.js';
import { AuthService } from '../services/AuthService.js';
import { AuthController } from '../controllers/AuthController.js';
import { registerValidator, loginValidator } from '../validators/authValidators.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const repo = new AuthRepository();
const service = new AuthService(repo);
const controller = new AuthController(service);

export const authRoutes = Router();

authRoutes.post('/register', registerValidator, controller.register);
authRoutes.post('/login', loginValidator, controller.login);
authRoutes.get('/me', requireAuth, controller.me);