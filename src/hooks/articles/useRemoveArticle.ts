import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/request';
import { API_ROUTES } from '@/routes/api_routes';

export const useRemoveArticle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (articleId: string) => {
            const { data } = await api.delete(API_ROUTES.ARTICLES.REMOVE_ARTICLE(articleId),{
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return data;
        },
        onSuccess: (_, articleId) => {
            queryClient.invalidateQueries({ queryKey: ['articles'] });
            // Fix wrong key quoting to ensure list invalidates
            queryClient.invalidateQueries({ queryKey: ['clientCreatedArticles'] });
            queryClient.invalidateQueries({ queryKey: ['article', articleId] });
            queryClient.invalidateQueries({ queryKey: ['me'] });
            // Force refetch active list queries for immediate UI update
            queryClient.refetchQueries({ queryKey: ['articles'], type: 'active' });
            queryClient.refetchQueries({ queryKey: ['clientCreatedArticles'], type: 'active' });
        },
    });
};
