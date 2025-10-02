import { CustomerDTO } from "../domain/dto/CustomerDTO";

export class CustomerService{
    constructor(customerRepository){
        this.customerRepository=customerRepository
    }

    async listCustomers(){
        try{
            const customers = await this.customerRepository.findAll();
            return customers.map(CustomerDTO.fromEntity);
        }catch(error){
            throw new Error('Failed to List Customers'=error.message);
        }
    }

    async getCustomer(id){
        try{
             if (!id || isNaN(id)) {
                throw new Error('Invalid Customer ID');
            }
            const customer = await this.customerRepository.findById(id);
            return customer ?CustomerDTO.fromEntity(customer):null;

        }catch(error){
            throw new Error(`Failed to get customer with id ${id}:${error.message}`);
        }
    }
    async createCustomer(data){
        try{
        const customer = await this.customerRepository.createCustomer(data);
        return CustomerDTO.fromEntity(customer);
        }catch(error){
            throw new Error(`Failed to create customer:`+error.message);
        }
    }
    async createCustomer(data){
        try{
        const customer = await this.customerRepository.createCustomer(data);
        return CustomerDTO.fromEntity(customer);
        }catch(error){
            throw new Error(`Failed to create customer:`+error.message);
        }
    }
    async
}