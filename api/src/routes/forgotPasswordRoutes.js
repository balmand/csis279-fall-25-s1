import express from 'express';
import { forgotPasswordController } from '../controllers/forgotPasswordController.js';

export const forgotPasswordRoutes = express.Router();

const controller = new forgotPasswordController();

forgotPasswordRoutes.post('/requestPasswordReset', controller.requestPasswordReset);

forgotPasswordRoutes.post('/resetPassword', controller.resetPassword);