import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/request";
import {API_ROUTES} from "@/routes/api_routes";


export const useChangeEmail = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, FormData>({
        mutationKey: ['changeEmail'],
        mutationFn: async (formData: FormData) => {
            const { data } = await api.patch<void>(API_ROUTES.PROFILE.CHANGE_EMAIL, formData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    });
};