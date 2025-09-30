import { useInfiniteQuery } from "@tanstack/react-query";
import { getArticles, GetArticlesResponse } from "@/hooks/articles/useGetArticles";

type SortOrder = "ASC" | "DESC";

export const useInfiniteArticles = (
    take = 8,
    sortBy?: string,
    order?: SortOrder,
    categories?: string[]
) => {
    return useInfiniteQuery<GetArticlesResponse>({
        queryKey: ["articles", "infinite", take, sortBy ?? "default", order ?? "default", categories],
        queryFn: ({ pageParam = 0 }) => getArticles(pageParam as number, take, sortBy, order, categories),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const loadedArticles = allPages.flatMap(p => p.articles).length;
            if (loadedArticles < lastPage.total) return loadedArticles;
            return undefined;
        },
    });
};


