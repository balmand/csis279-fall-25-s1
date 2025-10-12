import { body, validationResult } from "express-validator";

export const signupValidator = [
  body('name').trim().notEmpty().withMessage("Name is required."),
  body('email').isEmail().withMessage("Valid email is required."),
  body('phone').trim().notEmpty().withMessage("Phone is required."),
  body('address').trim().notEmpty().withMessage("Address is required."),
  body('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
    next();
  },
];
