import { useState } from 'react';
import { signupService } from "../services/SignUpService";

export function useSignup() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    //Signup Function
    const signup = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const response = await signupService.signup(credentials);
            setUser(response.user);
            setToken(response.token);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }
    return {
        user,
        loading, 
        error,
        token,
        signup
    }
}