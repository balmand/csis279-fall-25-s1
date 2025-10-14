import { Router } from "express";
import { CustomerRepository } from "../domain/repositories/CustomerRepository.js";
import { CustomerService } from "../services/CustomerService.js";
import { CustomerController } from "../controllers/CustomerController.js";
import { registrationValidators } from "../validators/registrationValidators.js";

const repo = new CustomerRepository();
const service = new CustomerService(repo);
const controller = new CustomerController(service);

export const registrationRoutes = Router();

customerRoutes.post("/signup", registrationValidators, controller.signup);


