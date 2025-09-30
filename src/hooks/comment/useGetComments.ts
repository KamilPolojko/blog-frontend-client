import { useQuery } from "@tanstack/react-query";
import { api } from "@/request";
import { CommentType } from '@/types/ArticleTypes';
import { API_ROUTES } from '@/routes/api_routes';

export type CommentResponseType={
    comments: CommentType[];
    count: number;
}

export const useGetComments = (articleId: string) => {
    return useQuery<CommentResponseType>({
        queryKey: ["comments", articleId],
        queryFn: async () => {
            const { data } = await api.get(API_ROUTES.COMMENTS.COMMENTS(articleId));
            return data;
        },
        enabled: !!articleId,
    });
};
