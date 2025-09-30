import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "@/request";
import { API_ROUTES } from "@/routes/api_routes";
import { articleType } from "@/types/ArticleTypes";
import { PaginatedResponse } from "@/types/PaginationTypes";

type Params = {
    clientId?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    filters?: Record<string, string>;
};

export const useGetArticlesCreatedByClient = ({
                                                  clientId,
                                                  page = 1,
                                                  limit = 10,
                                                  sortBy,
                                                  sortOrder,
                                                  filters = {},
                                              }: Params): UseQueryResult<PaginatedResponse<articleType>, Error> => {
    return useQuery<PaginatedResponse<articleType>, Error>({
        queryKey: [
            "clientCreatedArticles",
            clientId,
            page,
            limit,
            sortBy,
            sortOrder,
            filters,
        ],
        queryFn: async () => {
            const { data } = await api.get(
                API_ROUTES.ARTICLES.CREATED_BY_CLIENT(clientId),
                {
                    params: {
                        page,
                        limit,
                        sortBy,
                        sortOrder,
                        filters: JSON.stringify(filters),
                    },
                }
            );
            return data;
        },
        enabled: !!clientId,
        staleTime: 30000,
        gcTime: 300000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        placeholderData: (previousData) => previousData,
    });
};