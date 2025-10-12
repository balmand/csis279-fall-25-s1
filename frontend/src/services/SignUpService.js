const API_BASE_URL = 'http://localhost:4000/api';

class SignUpService {
    /**
     * Make HTTP request
     * @param {string} url - Request URL
     * @param {Object} options - Request options
     * @returns {Promise} Response data
     */
    async request(url, options = {}) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(`${API_BASE_URL}${url}`, config);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            // DELETE requests may return empty response
            if (response.status === 204) return null;

            return await response.json();
        } catch (error) {
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Network error. Please check your connection.');
            }
            throw error;
        }
    }

    /** User Registration */
    async signup(credentials) {
        return this.request('/customers', {
            method: 'POST', 
            body: JSON.stringify(credentials)
        });
    }

    
}

// Export singleton instance
export const signupService = new SignUpService();