const tryCatch = (fn) => async (...args) => {
    try {
        return { data: await fn(...args) };
    } catch (error) {
        throw error?.response?.data?.message || error?.message;
    }
}

export default tryCatch;
