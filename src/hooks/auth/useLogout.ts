import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/request';
import {API_ROUTES} from "@/routes/api_routes";

export const logoutUser = async (): Promise<void> => {
    await api.post(API_ROUTES.AUTH.LOGOUT, {}, { withCredentials: true });
};

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.resetQueries({ queryKey: ['me']});
        },
    });
};
