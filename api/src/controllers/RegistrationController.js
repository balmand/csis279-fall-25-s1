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

    list = async (req, res, next) => {
        try {
            const data = await this.registrationService.listRegistrations();
            res.json(data);
        } catch (e) {
            next(e);
        }
    };

    get = async (req, res, next) => {
        try {
            if (this._validate(req, res)) return;

            const data = await this.registrationService.getRegistration(req.params.id);
            if (!data) {
                return res.status(404).json({ message: 'Not Found' });
            }
            res.status(200).json(data);
        } catch (e) {
            next(e);
        }
    };

    create = async (req, res, next) => {
        try {
            if (this._validate(req, res)) return;

            const data = await this.registrationService.createRegistration(req.body);
            res.status(201).json(data);
        } catch (e) {
            next(e);
        }
    };

    update = async (req, res, next) => {
        try {
            if (this._validate(req, res)) return;

            const data = await this.registrationService.updateRegistration(req.params.id, req.body);
            if (!data) {
                return res.status(404).json({ message: 'No data found' });
            }
            res.status(200).json(data);
        } catch (e) {
            next(e);
        }
    };

    delete = async (req, res, next) => {
        try {
            if (this._validate(req, res)) return;

            const ok = await this.registrationService.deleteRegistration(req.params.id);
            if (!ok) {
                return res.status(404).json({ message: 'Not found' });
            }

            res.status(204).send();
        } catch (e) {
            next(e);
        }
    };

    listByCustomer = async (req, res, next) => {
        try {
            const { customerId } = req.params;
            const data = await this.registrationService.listByCustomer(customerId);
            res.json(data);
        } catch (e) {
            next(e);
        }
    };

    listByBook = async (req, res, next) => {
        try {
            const { bookId } = req.params;
            const data = await this.registrationService.listByBook(bookId);
            res.json(data);
        } catch (e) {
            next(e);
        }
    };
}
