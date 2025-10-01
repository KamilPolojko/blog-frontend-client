import axios from "axios";
import { authToken } from "@/lib/auth";


export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,
    headers: {
        'Content-Type': 'application/json'
    },
});


api.interceptors.request.use(
    (config) => {
        const token = authToken.get();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
