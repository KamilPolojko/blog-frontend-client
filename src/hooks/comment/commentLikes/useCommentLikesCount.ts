import { useQuery } from '@tanstack/react-query';
import { api } from '@/request';
import { API_ROUTES } from '@/routes/api_routes';

interface CommentLikesCountResponse {
    count: number;
}

export const useCommentLikesCount = (commentId: string) => {
    return useQuery<number>({
        queryKey: ['commentLikesCount', commentId],
        queryFn: async () => {
            const { data } = await api.get<CommentLikesCountResponse>(API_ROUTES.COMMENTS.COMMENT_LIKES.COMMENT_LIKES_COUNT(commentId));
            return data.count;
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};