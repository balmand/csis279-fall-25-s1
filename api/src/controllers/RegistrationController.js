import { validationResult } from 'express-validator';

export class RegistrationController {
    constructor(registrationService) {
        this.registrationService = registrationService;
    }

    _validate(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return true; // signal validation failure
        }
        return false;
    }

    async signup(req, res, next) {
        try {
            if (this._validate(req, res)) {
                return;
            }
            const data = await this.registrationService.signup(req.body);
            res.status(201).json({ customer: result });
        } catch (e) {
            next(e);
        }
    }

}