export class Registration {
    constructor({ 
        id = null, 
        customerId, 
        bookId, 
        date, 
        dueDate = null, 
        status = "active" 
    }) {
        this.id = id;
        this.customerId = customerId; 
        this.bookId = bookId;       
        this.date = date;             
        this.dueDate = dueDate;      
        this.status = status;         
    }
}
