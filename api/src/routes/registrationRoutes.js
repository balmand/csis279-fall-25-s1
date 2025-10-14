import { Router } from "express";
import { CustomerRepository } from "../domain/repositories/CustomerRepository.js";
import { CustomerService } from "../services/CustomerService.js";
import { CustomerController } from "../controllers/CustomerController.js";
import { customerRoutes } from "../routes/customerRoutes.js"
import { signupValidator } from "../validators/registrationValidators.js";

const repo = new CustomerRepository();
const service = new CustomerService(repo);
const controller = new CustomerController(service);

export const registrationRoutes = Router();

registrationRoutes.post("/signup", signupValidator, controller.create);


