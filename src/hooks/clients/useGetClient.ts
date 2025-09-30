import { clientType } from '@/types/ClientTypes';
import { api } from '@/request';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { API_ROUTES } from '@/routes/api_routes';

export const getClient = async (id: string) => {
    try {
        const { data } = await api.get<clientType>(API_ROUTES.CLIENTS.CLIENT_PROFILE(id));

        return data;
    } catch (error) {
        console.error('Fetch client error:', error);
        throw error;
    }
};

export const useGetClient = (id: string) => {
    return useQuery({
        queryKey: ['client', id],
        queryFn: () => getClient(id),
        enabled: !!id,
    }) as UseQueryResult<clientType>;
}