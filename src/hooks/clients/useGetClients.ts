import {api} from "@/request";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {clientType} from "@/types/ClientTypes";
import {API_ROUTES} from "@/routes/api_routes";

export const getClients = async () => {
    try {
        const { data } = await api.get<clientType[]>(API_ROUTES.CLIENTS.CLIENTS);

        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};


export const useGetClients= () => {
    return useQuery({
        queryKey: ['clients'],
        queryFn:getClients,
    }) as UseQueryResult<clientType[]>;
}