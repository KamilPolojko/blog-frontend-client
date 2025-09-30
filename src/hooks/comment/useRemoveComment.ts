import { useMutation } from '@tanstack/react-query';
import { api } from '@/request';
import { API_ROUTES } from '@/routes/api_routes';

export const useRemoveComment = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(API_ROUTES.COMMENTS.REMOVE_COMMENT(id), { withCredentials: true });
        },
    });
};
