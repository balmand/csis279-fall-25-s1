import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '../hooks/useSignUp';
import SignUpForm from '../components/SignUpForm';
import { create } from '../services/CustService';

export default function SignUpPage() {
    const {
        user,
        loading,
        error,
        signup
    } = useSignUp();

    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [localError, setLocalError] = useState('');


    const handleCreateCustomer = async (customerData) => {
        setLocalError('');
        setSubmitting(true);
        try {
            await create(customerData);
        } catch (e) {
            setLocalError(e?.message || 'Sign up failed.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate('/login');
    };


    return (
        <div style={{ padding: '2rem' }}>
            <h1>Customer SignUp</h1>

            {!loading && signup &&
                <SignUpForm
                    onSave={handleCreateCustomer}
                    onCancel={handleCancel}
                    disabled={loading || submitting}
                />
            }

            {(loading || submitting) && <p>Loading...</p>}
            {(error || localError) && <p style={{ color: 'red' }}>{error || localError}</p>}

        </div>
    );
}