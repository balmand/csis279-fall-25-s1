export class RegistrationDTO {
    constructor({ id, customerId, bookId, date, dueDate, status }) {
        this.id = id;
        this.customerId = customerId;
        this.bookId = bookId;
        this.date = date;
        this.dueDate = dueDate;
        this.status = status;
    }

    static fromEntity(entity) {
        return new RegistrationDTO({
            id: entity.id,
            customerId: entity.customerId,
            bookId: entity.bookId,
            date: entity.date,
            dueDate: entity.dueDate,
            status: entity.status
        });
    }
}
