import { QueryClient } from '@tanstack/react-query';
import { deleteSaveArticleParams } from '@/hooks/savedArticles/useDeleteSavedArticle';

export interface InvalidationOptions {
    invalidateArticleList?: boolean;
    invalidateSingleArticle?: boolean;
    invalidateUserProfile?: boolean;
}

export const queryInvalidators = {
    invalidateSavedArticles: (
        queryClient: QueryClient,
        variables: deleteSaveArticleParams,
        options?: InvalidationOptions
    ) => {
        queryClient.invalidateQueries({ queryKey: ['saved', variables.userId] });

        if (options?.invalidateArticleList) {
            queryClient.invalidateQueries({ queryKey: ['articles'] });
            queryClient.invalidateQueries({ queryKey: ['clientSavedArticles'] });
        }

        if (options?.invalidateSingleArticle) {
            queryClient.invalidateQueries({ queryKey: ['article', variables.articleId] });
        }
    },

    invalidateLikes: (
        queryClient: QueryClient,
        variables: { articleId: string | number },
    ) => {
        queryClient.invalidateQueries({ queryKey: ['me'] });
        queryClient.invalidateQueries({ queryKey: ['article', variables.articleId] });
        queryClient.invalidateQueries({ queryKey: ['articleLikesCount', variables.articleId] });
        queryClient.invalidateQueries({ queryKey: ['articles'] });
        queryClient.invalidateQueries({ queryKey: ['clientSavedArticles'] });
    },

};