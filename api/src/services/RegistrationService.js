import bcrypt from "bcrypt";
import { RegistrationDTO } from '../domain/dto/RegistrationDTO.js'

export class CustomerService {
    constructor(registrationRepository) {
        this.customerRepository = registrationRepository;
    }

    async signup({ name, email, phone, address, password }) {
        try {
            const passwordHash = await bcrypt.hash(password, 10);
            const customer = await this.customerRepository.create({ name, email, phone, address, passwordHash });
            return RegistrationDTO.fromEntity(customer);
        } catch (error) {
            throw new Error('Failed to create customer: ' + error.message);
        }
    
  }
}

