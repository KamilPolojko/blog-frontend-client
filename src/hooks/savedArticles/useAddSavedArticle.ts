import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/request';
import { API_ROUTES } from "@/routes/api_routes";
import { queryInvalidators } from '@/constants/query_invalidators';

interface addSaveArticleParams {
    userId?: string;
    articleId?: string;
}

interface UseSaveOptions{
    invalidateArticleList?: boolean;
    invalidateSingleArticle?: boolean;
}

const saveArticle = async ({ userId, articleId }: addSaveArticleParams) => {
    return api.post(API_ROUTES.SAVED_ARTICLES.ADD_SAVED_ARTICLE, { userId, articleId });
};

export const useAddSavedArticle = (options?: UseSaveOptions) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: saveArticle,
        onSuccess: (_, variables) => {
            queryInvalidators.invalidateSavedArticles(queryClient, variables, options);
        },
    });
};

