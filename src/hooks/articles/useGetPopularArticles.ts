import { api } from "@/request";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { articleType } from "@/types/ArticleTypes";
import { API_ROUTES } from "@/routes/api_routes";

export interface GetPopularArticlesResponse {
    articles: articleType[];
    total: number;
}

export const getPopularArticles = async (skip = 0, take = 4) => {
    try {
        const { data } = await api.get<GetPopularArticlesResponse>(
            API_ROUTES.ARTICLES.POPULAR,
            {
                params: { skip, take },
            }
        );
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};

export const useGetPopularArticles = (skip = 0, take = 4) => {
    return useQuery({
        queryKey: ["popularArticles", skip, take],
        queryFn: () => getPopularArticles(skip, take),
    }) as UseQueryResult<GetPopularArticlesResponse>;
};
