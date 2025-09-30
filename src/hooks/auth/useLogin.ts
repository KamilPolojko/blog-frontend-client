import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/request';
import {LoginRequest, LoginResponse, User} from "@/types/LoginTypes";
import {API_ROUTES} from "@/routes/api_routes";

export const loginUser = async (payload: LoginRequest): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>(API_ROUTES.AUTH.LOGIN, payload, {
        withCredentials: true
    });
    return data;
};

export const getMe = async (): Promise<User> => {
    const { data } = await api.get<User>(API_ROUTES.AUTH.ME, {
        withCredentials: true
    });
    return data;
};

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: async () => {
            try {
                const userData = await getMe();
                queryClient.setQueryData(['me'], userData);
            } catch (err) {
                console.error('Błąd przy pobieraniu usera po zalogowaniu:', err);
            }
        }
    });
};
