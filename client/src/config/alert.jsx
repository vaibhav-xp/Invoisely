import { toast } from "react-toastify";

export const alertSuccess = (message) => message.map(msg => toast.success(msg));
export const alertError = (error) => error.map(msg => toast.error(msg));
