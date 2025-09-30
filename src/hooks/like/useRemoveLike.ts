import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/request';
import { API_ROUTES } from '@/routes/api_routes';
import { ArticleLikesCountResponse } from '@/hooks/like/useGetArticleLikesCount';
import { queryInvalidators } from '@/constants/query_invalidators';

interface LikePayload {
    articleId: string;
    userId: string;
}

export const useRemoveLike = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['removeLike'],
        mutationFn: async ({ articleId, userId }: LikePayload) => {
            const { data } = await api.delete(API_ROUTES.ARTICLES.REMOVE_LIKE, {
                data: { articleId, userId },
                withCredentials: true,
            });
            return data;
        },
        onMutate: async ({ articleId }) => {
            await queryClient.cancelQueries({ queryKey: ['articleLikesCount', articleId] });
            const previous = queryClient.getQueryData<ArticleLikesCountResponse>(['articleLikesCount', articleId]);

            queryClient.setQueryData(['articleLikesCount', articleId], (old: ArticleLikesCountResponse) => ({
                ...old,
                count: Math.max((old?.count ?? 1) - 1, 0),
            }));

            return { previous };
        },
        onError: (_err, variables, context) => {
            if (context?.previous) {
                queryClient.setQueryData(['articleLikesCount', variables.articleId], context.previous);
            }
        },
        onSettled: (_data, _error, variables) => {
            queryInvalidators.invalidateLikes(queryClient, variables);
        },
    });
};






