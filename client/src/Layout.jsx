import React from 'react'
import useAuth from './hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const { token } = useAuth();
    const location = useLocation();

    return (
        token
            ? <Outlet />
            : <Navigate
                to={"/login"}
                replace
                state={{ from: location }}
            />
    )
}

export default Layout