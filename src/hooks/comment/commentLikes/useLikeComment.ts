import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { api } from '@/request';
import { API_ROUTES } from '@/routes/api_routes';

export const useLikeComment = (commentId: string): UseMutationResult<void, Error, void> => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, void>({
        mutationKey: ['likeComment', commentId],
        mutationFn: async () => {
            await api.post(API_ROUTES.COMMENTS.COMMENT_LIKES.COMMENT_LIKE_TOGGLE(commentId), {}, { withCredentials: true });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
            queryClient.invalidateQueries({ queryKey: ['commentLike', 'me', commentId] });
            queryClient.invalidateQueries({ queryKey: ['commentLikesCount', commentId] });
        },
    });
};