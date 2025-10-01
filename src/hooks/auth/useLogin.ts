import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/request';
import { LoginRequest, LoginResponse, User } from "@/types/LoginTypes";
import { API_ROUTES } from "@/routes/api_routes";
import { authToken } from "@/lib/auth";

export const loginUser = async (payload: LoginRequest): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>(API_ROUTES.AUTH.LOGIN, payload);
    return data;
};

export const getMe = async (): Promise<User> => {
    const { data } = await api.get<User>(API_ROUTES.AUTH.ME);
    return data;
};

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: async (response) => {
            try {
                // Zapisz token
                authToken.set(response.access_token);
                
                // Pobierz dane usera
                const userData = await getMe();
                queryClient.setQueryData(['me'], userData);
            } catch (err) {
                console.error('Błąd przy pobieraniu usera po zalogowaniu:', err);
                authToken.remove();
            }
        }
    });
};