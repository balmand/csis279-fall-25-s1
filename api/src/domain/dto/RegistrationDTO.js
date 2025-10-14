export class RegistrationDTO {
    constructor({ id, name, email, phone, address, password }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.password = password;
    }

    static fromEntity(entity) {
        return new RegistrationDTO({
            id: entity.id,
            customerId: entity.customerId,
            name: entity.name,
            email: entity.email,
            phone: entity.phone,
            password: entity.password
        });
    }
}