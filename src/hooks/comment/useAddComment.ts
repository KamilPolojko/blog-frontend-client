import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/request';
import {API_ROUTES} from "@/routes/api_routes";

export const useAddComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ articleId, userId, content, parentId }: { articleId: string; userId: string, content: string, parentId?: string }) => {
            const { data } = await api.post(
                API_ROUTES.COMMENTS.ADD_COMMENT,
                { articleId, userId, content, parentId }
            );
            return data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey:['me']});
            queryClient.invalidateQueries({ queryKey: ['article', variables.articleId] });
            queryClient.invalidateQueries({queryKey: ['articles']});
        },
    });
};

