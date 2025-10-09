import { verifyAccess } from '../utils/jwt.js';

export const requireAuth = (req, res, next) => {
    const [scheme, token] = (req.headers.authorization || '').split(' ');
    if (scheme !== 'Bearer' || !token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const p = verifyAccess(token);
        req.user = { id: p.sub, role: p.role };
        next();
    } catch {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};