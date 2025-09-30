import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/request';
import { API_ROUTES } from '@/routes/api_routes';
import { articleType } from '@/types/ArticleTypes';

type SavedArticlesResponse = {
    articles: articleType[];
    hasMore: boolean;
};

export const useGetSavedArticles = (userId: string | undefined, limit = 8) => {
    return useInfiniteQuery<SavedArticlesResponse>({
        queryKey: ['clientSavedArticles', userId],
        queryFn: async ({ pageParam = 0 }) => {
            const { data } = await api.get(
                API_ROUTES.SAVED_ARTICLES.SAVED_ARTICLES(userId),
                {
                    params: { offset: pageParam, limit },
                }
            );
            return data;
        },
        enabled: !!userId,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasMore) {
                return allPages.length * limit;
            }
            return undefined;
        },
    });
};
