import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("invoice_app"));
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("invoice_app");
        setToken(null);
        navigate("/login");
    }

    const setAuthState = (token) => {
        localStorage.setItem("invoice_app", token);
        setToken(token);
        navigate("/");
    }

    return (
        <AuthContext.Provider value={{ token, logout, setAuthState }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;