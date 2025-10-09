import jwt from 'jsonwebtoken';

export const signAccess = (payload, opts = {}) =>
    jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_TTL || '1h',
        ...opts,
    });

export const verifyAccess = (token) => jwt.verify(token, process.env.JWT_ACCESS_SECRET);