import {api} from "@/request";
import {useQuery} from "@tanstack/react-query";
import {articleType} from "@/types/ArticleTypes";
import {API_ROUTES} from "@/routes/api_routes";


export const getArticleById = async (id: string): Promise<articleType> => {
    const { data } = await api.get(API_ROUTES.ARTICLES.ARTICLE(id));
    return data;
};

export const useGetArticleById = (id: string) => {
    return useQuery<articleType>({
        queryKey: ['article', id],
        queryFn: () => getArticleById(id),
        enabled: !!id,
    });
};