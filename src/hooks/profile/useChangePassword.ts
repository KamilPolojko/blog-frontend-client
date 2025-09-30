import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/request";
import {API_ROUTES} from "@/routes/api_routes";


export const useChangePassword = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, FormData>({
        mutationKey: ['changePassword'],
        mutationFn: async (formData: FormData) => {
            const { data } = await api.patch<void>(API_ROUTES.PROFILE.CHANGE_PASSWORD, formData, {
                withCredentials: true,
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    });
};