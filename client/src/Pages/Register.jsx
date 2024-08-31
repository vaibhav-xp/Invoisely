import { useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { alertError, alertSuccess } from '../config/alert';
import { RegisterFn } from '../services';

const initialState = {
    username: '',
    email: '',
    password: '',
    confirm_password: ""
}

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);

    const { mutate: register, isLoading, isError, isSuccess } = useMutation(RegisterFn, {
        onSuccess: (data) => {
            alertSuccess(data?.message || "Registration successful!");
            setFormData(initialState);
            navigate("/login");
        },
        onError: (error) => {
            alertError(error.message || "Registration failed.");
        }
    });

    // handle onChange
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirm_password) {
            toast.error('Passwords do not match');
            return;
        }

        register(formData);
    };

    // Optionally handle specific loading state
    const buttonText = isLoading ? "Registering..." : "Register";

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Registration</h2>
                <form onSubmit={handleSubmit} method='POST'>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="username">
                            Name
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="confirm_password">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        {buttonText}
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
