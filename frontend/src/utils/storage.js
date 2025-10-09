class Storage {
    static async setUser(user, id) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userId', id);
    }

    static async getUser() {
        const user = {
            name: localStorage.getItem('user'),
            id: localStorage.getItem('userId')
        };
        return user ? user : null;
    }
}

export default Storage;