import React, { useState, useEffect, use } from 'react';

export default function LoginForm({ onLogin, loading = false }) {
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setLoginForm({ email: '', password: '' });
        setErrors({});
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!loginForm.email.trim()) newErrors.email = 'Email is required';
        if (!loginForm.password.trim()) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        onLogin(loginForm);
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
            <input
                name="email"
                type="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={handleChange}
                disabled={loading}
            />
            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

            <input
                name="password"
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={handleChange}
                disabled={loading}
            />
            {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}

            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    )
}

