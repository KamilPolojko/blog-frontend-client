import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/request";
import {API_ROUTES} from "@/routes/api_routes";


export const useCreateArticle = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, FormData>({
        mutationKey: ['articleCreate'],
        mutationFn: async (formData: FormData) => {
            return api.patch(API_ROUTES.ARTICLES.CREATE_ARTICLE, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
            queryClient.invalidateQueries({ queryKey: ['clientSavedArticles'] });
            queryClient.invalidateQueries({ queryKey: ['clientCreatedArticles'] });
        },
    });
};