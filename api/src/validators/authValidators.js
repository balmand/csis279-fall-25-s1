import { body } from 'express-validator';

const email = body('email').isEmail().withMessage('Valid email required');

export const registerValidator = [
    body('name').notEmpty().withMessage('Name required'),
    email,
    body('password').isLength({ min: 8 }).withMessage('Password ≥ 8 chars'),
    body('phone').optional().isLength({ max: 30 }),
    body('address').optional().isLength({ max: 200 }),
];

export const loginValidator = [email, body('password').notEmpty().withMessage('Password required')];