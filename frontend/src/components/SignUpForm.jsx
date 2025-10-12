import React, { useState, useEffect } from "react";

export function SignUpForm({ onSave, editUser, onCancel, loading = false }) {

    const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", password: "" });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (editUser) setForm(editUser);
        else
            setForm({ name: "", email: "", phone: "", address: "", password: "" });
        setSuccess(false);
    }, [editUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        if (!form.phone.trim()) newErrors.name = "Phone is required";
        if (!form.address.trim()) newErrors.email = "Address is required";
        if (!form.password.trim()) newErrors.email = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        onSave(form, editUser?.id);
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
            <h2>Sign Up</h2>
            <p>Create your account and get started</p>

            <div>
                <input
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={loading}
                />
                {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
            </div>

            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={loading}
                />
                {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
            </div>

            <div>
                <input
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={loading}
                />
                {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
            </div>

            <div>
                <input
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                    disabled={loading}
                />
                {errors.address && (<span style={{ color: "red" }}>{errors.address}</span>)}
            </div>

            <div>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    disabled={loading}
                />
                {errors.password && (
                    <span style={{ color: "red" }}>{errors.password}</span>
                )}
            </div>
            {success && (<p style={{ color: "green" }}>Registration successful!</p>
            )}

            <button type="submit" disabled={loading}>
                {loading
                    ? "Creating account..."
                    : editUser
                        ? "Update User"
                        : "Sign Up"}
            </button>

            {editUser && (
                <button type="button" onClick={onCancel} disabled={loading}>
                    Cancel
                </button>
            )}

            <div>
                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </form>
    );
}

export default SignUpForm;