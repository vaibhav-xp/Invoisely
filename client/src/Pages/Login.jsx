import { useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { alertError, alertSuccess } from '../config/alert';
import useAuth from '../hooks/useAuth';
import { LoginFn } from '../services';

const initialState = {
    email: '',
    password: '',
}

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState(initialState);
    const { setAuthState } = useAuth()
    const from = location?.state?.from?.pathname || "/";

    const { mutate: login, isLoading } = useMutation(LoginFn, {
        onSuccess: ({ data }) => {
            console.log(data);
            setAuthState(data?.data?.access_token);
            alertSuccess(data?.message);
            setFormData(initialState);
            navigate(from);
        },
        onError: (error) => alertError(error)
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
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
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        {isLoading ? "Login..." : "Login"}
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-600">
                    Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
