import axios from 'axios'

const useAxios = () => {
    const publicEndpoints = {
        signup: "/user/register",
        login: "/user/login"
    }

    const protectedEndpoints = {
        invoice: "/invoice/",
    }

    const baseApi = () => {
        const token = localStorage.getItem("invoice_app");

        let headers = {
            "Content-Type": "application/json"
        };

        if (token) {
            headers["x-access-token"] = token;
        }

        return axios.create({
            baseURL: import.meta.env.VITE_API,
            headers
        })
    }

    return {
        publicEndpoints,
        protectedEndpoints,
        baseApi
    }
}

export default useAxios