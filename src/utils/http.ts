import axios, { type AxiosRequestConfig } from "axios";

const AC_ANONYMOUS_CHAT_API_URL = import.meta.env.AC_ANONYMOUS_CHAT_API_URL as string;
const AC_HTTP_CLIENT_TIMEOUT = import.meta.env.AC_HTTP_CLIENT_TIMEOUT as string;
const instance = axios.create({
    baseURL: AC_ANONYMOUS_CHAT_API_URL,
    timeout: Number(AC_HTTP_CLIENT_TIMEOUT) || 5000,
    headers: {
        "Content-Type": "application/json",
    },
});
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
            console.error("Network timeout! The server took too long to respond.");
        } else if (!error.response) {
            console.error("Network error! Please check your internet connection.");
        } else {
            const status = error.response.status;
            switch (status) {
                case 401:
                    console.error("Unauthorized: Please check your login credentials.");
                    break;
                case 403:
                    console.error("Forbidden: You don't have permission to do this.");
                    break;
                case 404:
                    console.error("Not Found: The requested resource does not exist.");
                    break;
                case 500:
                    console.error("Server Error: Something went wrong on the server.");
                    break;
                default:
                    console.error(`Error ${status}: ${error.response.data?.msg || "Unknown error occurred"}`);
            }
        }
        return Promise.reject(error);
    }
);

async function get<T = any>(url: string, config?: AxiosRequestConfig) {
    return instance.get<T>(url, config);
}

async function post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return instance.post<T>(url, data, config);
}

async function put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return instance.put<T>(url, data, config);
}

async function del<T = any>(url: string, config?: AxiosRequestConfig) {
    return instance.delete<T>(url, config);
}

export { get, post, put, del };