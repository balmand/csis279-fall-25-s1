import { Router } from 'express';
import { RegistrationRepository } from '../domain/repositories/RegistrationRepository.js';
import { RegistrationService } from '../services/RegistrationService.js';
import { RegistrationController } from '../controllers/RegistrationController.js';
import { idParam, upsertRegistration } from '../validators/registrationValidators.js';

const repo = new RegistrationRepository();
const service = new RegistrationService(repo);
const controller = new RegistrationController(service);

export const registrationRoutes = Router();

registrationRoutes.get('/', controller.list);
registrationRoutes.get('/:id', idParam, controller.get);
registrationRoutes.post('/', upsertRegistration, controller.create);
registrationRoutes.put('/:id', [...idParam, ...upsertRegistration], controller.update);
registrationRoutes.delete('/:id', idParam, controller.delete);
