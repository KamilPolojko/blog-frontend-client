import { useMutation, useQueryClient } from "@tanstack/react-query";
import {API_ROUTES} from "@/routes/api_routes";
import {api} from "@/request";

export const useUpdateArticle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['articleUpdate'],
        mutationFn: async (data: FormData) => {
            const res = await api.patch(API_ROUTES.ARTICLES.UPDATE_ARTICLE, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return res.data;
        },
        onSuccess: (updatedArticle) => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
            queryClient.invalidateQueries({ queryKey: ["article", updatedArticle.id] });
            queryClient.invalidateQueries({ queryKey: ['clientSavedArticles'] });
            queryClient.invalidateQueries({ queryKey: ['clientCreatedArticles'] });
        },
    });
};
