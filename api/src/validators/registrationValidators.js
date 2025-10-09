import { body, param } from 'express-validator';

export const idParam = [
    param('id')
        .isInt({ gt: 0 })
        .withMessage('id must be a positive integer')
];

export const upsertRegistration = [
    body('customerId')
        .isInt({ gt: 0 })
        .withMessage('customerId must be a positive integer'),

    body('bookId')
        .isInt({ gt: 0 })
        .withMessage('bookId must be a positive integer'),

    body('date')
        .isISO8601()
        .withMessage('date must be a valid ISO 8601 date (e.g., 2025-10-09)'),

    body('dueDate')
        .optional({ values: 'falsy' }) // allows null or missing field
        .isISO8601()
        .withMessage('dueDate must be a valid ISO 8601 date if provided'),

    body('status')
        .optional()
        .isString()
        .isIn(['active', 'completed', 'cancelled'])
        .withMessage('status must be one of: active, completed, cancelled'),
];
