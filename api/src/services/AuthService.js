import bcrypt from 'bcrypt';
import { signAccess } from '../utils/jwt.js';

const SALT_ROUNDS = 12;

export class AuthService {
    constructor(authRepo) {
        this.authRepo = authRepo;
    }

    async register({ name, email, phone, address, password }) {
        const exists = await this.authRepo.findByEmail(email);
        if (exists) return { error: 'Email already in use', status: 409 };

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await this.authRepo.createCustomerWithPassword({
            name,
            email,
            phone,
            address,
            passwordHash,
        });

        const accessToken = signAccess({ sub: user.id, role: user.role });
        return { user, accessToken };
    }

    async login({ email, password }) {
        const u = await this.authRepo.findByEmail(email);
        if (!u || !u.password_hash) return { error: 'Invalid credentials', status: 401 };

        const ok = await bcrypt.compare(password, u.password_hash);
        if (!ok) return { error: 'Invalid credentials', status: 401 };

        const accessToken = signAccess({ sub: u.id, role: u.role });
        const { id, name, phone, address, role } = u;
        return { user: { id, name, email: u.email, phone, address, role }, accessToken };
    }

    async me(userId) {
        return this.authRepo.findByIdPublic(userId);
    }
}