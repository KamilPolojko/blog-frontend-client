import { useQuery } from '@tanstack/react-query';
import { api } from '@/request';
import { LikeType } from '@/types/ArticleTypes';
import { API_ROUTES } from '@/routes/api_routes';

export interface ArticleLikesCountResponse {
    likes: LikeType[];
    count: number;
}

export const useGetArticleLikesCount = (articleId: string) => {
    return useQuery<ArticleLikesCountResponse>({
        queryKey: ['articleLikesCount', articleId],
        queryFn: async () => {
            const { data } = await api.get(
                API_ROUTES.ARTICLES.LIKES_COUNT(articleId),
            );
            return data;
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};
