import {API_ROUTES} from "@/routes/api_routes";
import {api} from "@/request";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { queryInvalidators } from '@/constants/query_invalidators';

export interface deleteSaveArticleParams {
    userId?: string;
    articleId?: string;
}

interface UseSaveOptions{
    invalidateArticleList?: boolean;
    invalidateSingleArticle?: boolean;
}

const deleteSavedArticle = async ({ userId, articleId }: deleteSaveArticleParams) => {
    return api.delete(API_ROUTES.SAVED_ARTICLES.REMOVE_SAVED_ARTICLE, { data: { userId, articleId } });
};

export const useDeleteSavedArticle = (options?: UseSaveOptions) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteSavedArticle,
        onSuccess: (_, variables) => {
            queryInvalidators.invalidateSavedArticles(queryClient, variables, options);
        },
    });
};


