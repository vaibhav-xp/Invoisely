import tryCatch from "../config/tryCatch"
import useAxios from "../hooks/useAxios"

export const RegisterFn = tryCatch(async (reqBody) => {
    const { baseApi, publicEndpoints } = useAxios();
    const { data } = await baseApi().post(publicEndpoints.signup, reqBody);
    return data;
})

export const LoginFn = tryCatch(async (reqBody) => {
    const { baseApi, publicEndpoints } = useAxios();
    const { data } = await baseApi().post(publicEndpoints.login, reqBody);
    return data;
})

export const getProductFn = tryCatch(async () => {
    const { baseApi, protectedEndpoints } = useAxios();
    const { data } = await baseApi().get(protectedEndpoints.invoice);
    return data;
})

export const postProductFn = tryCatch(async (reqBody) => {
    const { baseApi, protectedEndpoints } = useAxios();
    const { data } = await baseApi().post(protectedEndpoints.invoice, reqBody);
    return data;
})

export const getProductByIdFn = tryCatch(async (invoice_id) => {
    const { baseApi, protectedEndpoints } = useAxios();
    const { data } = await baseApi().get(`${protectedEndpoints.invoice}${invoice_id}`);
    return data;
})
