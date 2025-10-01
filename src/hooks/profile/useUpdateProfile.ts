import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/request";
import {API_ROUTES} from "@/routes/api_routes";


export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, FormData>({
        mutationKey: ['updateProfile'],
        mutationFn: async (formData: FormData) => {
            return api.patch(API_ROUTES.PROFILE.UPDATE_PROFILE, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }});
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    });
};