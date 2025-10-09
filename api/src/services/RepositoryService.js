import { RegistrationDTO } from '../domain/dto/RegistrationDTO.js';

export class RegistrationService {
    constructor(registrationRepository) {
        this.registrationRepository = registrationRepository;
    }

    async listRegistrations() {
        try {
            const registrations = await this.registrationRepository.findAll();
            return registrations.map(RegistrationDTO.fromEntity);
        } catch (error) {
            throw new Error('Failed to list registrations: ' + error.message);
        }
    }

    async getRegistration(id) {
        try {
            const registration = await this.registrationRepository.findById(id);
            return registration ? RegistrationDTO.fromEntity(registration) : null;
        } catch (error) {
            throw new Error(`Failed to get registration with id ${id}: ${error.message}`);
        }
    }

    async createRegistration(data) {
        try {
            const registration = await this.registrationRepository.create(data);
            return RegistrationDTO.fromEntity(registration);
        } catch (error) {
            throw new Error('Failed to create registration: ' + error.message);
        }
    }

    async updateRegistration(id, data) {
        try {
            const registration = await this.registrationRepository.update(id, data);
            return registration ? RegistrationDTO.fromEntity(registration) : null;
        } catch (error) {
            throw new Error(`Failed to update registration with id ${id}: ${error.message}`);
        }
    }

    async deleteRegistration(id) {
        try {
            return await this.registrationRepository.delete(id);
        } catch (error) {
            throw new Error(`Failed to delete registration with id ${id}: ${error.message}`);
        }
    }

    async listByCustomer(customerId) {
        try {
            const registrations = await this.registrationRepository.findByCustomerId(customerId);
            return registrations.map(RegistrationDTO.fromEntity);
        } catch (error) {
            throw new Error(`Failed to list registrations for customer ${customerId}: ${error.message}`);
        }
    }

    async listByBook(bookId) {
        try {
            const registrations = await this.registrationRepository.findByBookId(bookId);
            return registrations.map(RegistrationDTO.fromEntity);
        } catch (error) {
            throw new Error(`Failed to list registrations for book ${bookId}: ${error.message}`);
        }
    }
}
