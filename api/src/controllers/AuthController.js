import { validationResult } from 'express-validator';

export class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    _handleValidation(req, res) {
        const v = validationResult(req);
        if (!v.isEmpty()) {
            res.status(400).json({ errors: v.array() });
            return true;
        }
        return false;
    }

    register = async (req, res, next) => {
        try {
            if (this._handleValidation(req, res)) return;
            const r = await this.authService.register(req.body);
            if (r?.error) return res.status(r.status).json({ message: r.error });
            res.status(201).json(r);
        } catch (e) {
            next(e);
        }
    };

    login = async (req, res, next) => {
        try {
            if (this._handleValidation(req, res)) return;
            const r = await this.authService.login(req.body);
            if (r?.error) return res.status(r.status).json({ message: r.error });
            res.json(r);
        } catch (e) {
            next(e);
        }
    };

    me = async (req, res, next) => {
        try {
            const u = await this.authService.me(req.user.id);
            if (!u) return res.status(404).json({ message: 'Not found' });
            res.json(u);
        } catch (e) {
            next(e);
        }
    };
}