import { useQuery } from '@tanstack/react-query';
import { getMe } from './useLogin';

export const useMe = () => {
    return useQuery({
        queryKey: ['me'],
        queryFn: getMe,
        retry: false,
    });
};
