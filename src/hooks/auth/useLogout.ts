import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/request';
import { API_ROUTES } from "@/routes/api_routes";
import { authToken } from "@/lib/auth";
import { useRouter } from 'next/navigation';

export const logoutUser = async (): Promise<void> => {
    await api.post(API_ROUTES.AUTH.LOGOUT);
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            authToken.remove();
            queryClient.setQueryData(['me'], null);
            queryClient.clear();
            
            router.push('/');
        },
        onError: () => {
            authToken.remove();
            queryClient.setQueryData(['me'], null);
            queryClient.clear();
            router.push('/');
        }
    });
};