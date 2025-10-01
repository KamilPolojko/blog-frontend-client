import { useQuery } from '@tanstack/react-query';
import { api } from '@/request';
import { API_ROUTES } from '@/routes/api_routes';

export const useCommentLikeStatus = (commentId: string, userId?: string) => {
    return useQuery<boolean>({
        queryKey: ['commentLike',"me", commentId],
        queryFn: async () => {
            if(!userId) return false;
            const { data } = await api.get(API_ROUTES.COMMENTS.COMMENT_LIKES.COMMENT_LIKE_STATUS(commentId));
            return data.liked as boolean;
        },
        enabled: !!commentId && !!userId,
    });
};

