import {api} from "@/request";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {articleType} from "@/types/ArticleTypes";
import {API_ROUTES} from "@/routes/api_routes";
import qs from "qs";

export interface GetArticlesResponse {
    articles: articleType[];
    total: number;
}

type SortOrder = 'ASC' | 'DESC';

export const getArticles = async (
    skip = 0,
    take = 10,
    sortBy?: string,
    order?: SortOrder,
    categories?: string[]
) => {
    try {
        const params: Record<string, any> = { skip, take };

        if (sortBy && order) {
            params.sortBy = sortBy;
            params.order = order;
        }

        if (categories && categories.length > 0) {
            params.categories = categories;
        }

        console.log("[DEBUG] Fetching articles with params:", params);

        const { data } = await api.get<GetArticlesResponse>(
            API_ROUTES.ARTICLES.ARTICLES,
            {
                params,
                paramsSerializer: (params) =>
                    qs.stringify(params, { arrayFormat: "repeat" }),
            }
        );

        console.log("Data",data);
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};


export const useGetArticles = (
    skip = 0,
    take = 10,
    sortBy?: string,
    order?: SortOrder
) => {
    return useQuery({
        queryKey: ["articles", skip, take, sortBy ?? "default", order ?? "default"],
        queryFn: () => getArticles(skip, take, sortBy, order),
    }) as UseQueryResult<GetArticlesResponse>;
};
