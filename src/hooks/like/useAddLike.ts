import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/request';
import { API_ROUTES } from '@/routes/api_routes';
import { ArticleLikesCountResponse } from '@/hooks/like/useGetArticleLikesCount';
import { queryInvalidators } from '@/constants/query_invalidators';

interface LikePayload {
    articleId: string;
    userId: string;
}

export const useLikeArticle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['likeArticle'],
        mutationFn: async ({ articleId, userId }: LikePayload) => {
            const { data } = await api.post(API_ROUTES.ARTICLES.ADD_LIKE, { articleId, userId }, { withCredentials: true });
            return data;
        },
        onMutate: async ({ articleId }) => {
            await queryClient.cancelQueries({ queryKey: ['articleLikesCount', articleId] });
            const previous = queryClient.getQueryData<ArticleLikesCountResponse>(['articleLikesCount', articleId]);

            queryClient.setQueryData(['articleLikesCount', articleId], (old: ArticleLikesCountResponse) => ({
                ...old,
                count: (old?.count ?? 0) + 1,
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





