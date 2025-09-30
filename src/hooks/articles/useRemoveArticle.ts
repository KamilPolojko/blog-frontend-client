import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/request';
import { API_ROUTES } from '@/routes/api_routes';

export const useRemoveArticle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (articleId: string) => {
            const { data } = await api.delete(API_ROUTES.ARTICLES.REMOVE_ARTICLE(articleId),{
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            return data;
        },
        onSuccess: (_, articleId) => {
            queryClient.invalidateQueries({ queryKey: ['articles'] });
            queryClient.invalidateQueries({ queryKey: ['"clientCreatedArticles"'] });
            queryClient.invalidateQueries({ queryKey: ['article', articleId] });
            queryClient.invalidateQueries({ queryKey: ['me'] });
        },
    });
};
