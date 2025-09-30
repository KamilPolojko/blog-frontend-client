import { useMutation } from '@tanstack/react-query';
import { api } from '@/request';
import {RegisterRequest, RegisterResponse} from "@/types/AuthTypes";
import {API_ROUTES} from "@/routes/api_routes";

export const registerUser = async (payload: RegisterRequest) => {
    try {
        const { data } = await api.post<RegisterResponse>(API_ROUTES.AUTH.REGISTER, payload);
        return data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const useRegister = () => {
    return useMutation({
        mutationFn: (payload: RegisterRequest) => registerUser(payload),
    });
};
