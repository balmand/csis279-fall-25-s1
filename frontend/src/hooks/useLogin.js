import { useState, useEffect } from "react";
import { loginService } from "../services/loginService";

export function useLogin() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    // Login function
    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const response = await loginService.login(credentials);
            setUser(response.user);
            setToken(response.token);

            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));

            return response;
        }
        catch (err) {
            setError(err.message);
            throw err;
        }  
        finally {
            setLoading(false);
        }
    }

    return {
        user,
        loading,
        error,
        token,
        login
    }
}