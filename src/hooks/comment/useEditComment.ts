import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/request";
import { API_ROUTES } from '@/routes/api_routes';

export const useEditComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ commentId, content }: { commentId: string, content: string }) => {
            const { data } = await api.put(
                API_ROUTES.COMMENTS.EDIT_COMMENT,
                { commentId, content }
            );
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
        },
        onError: (error) => {
            console.error('Błąd podczas aktualizacji komentarza:', error);
        }
    });
};