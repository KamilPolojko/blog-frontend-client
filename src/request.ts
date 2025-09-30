import axios from "axios";

console.log('BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL);

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,
    headers: {
        'Content-Type': 'application/json'
    },
});