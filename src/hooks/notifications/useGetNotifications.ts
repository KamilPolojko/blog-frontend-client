import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {Notification} from "@/types/NotificationTypes";
import { api } from '@/request';
import { API_ROUTES } from '@/routes/api_routes';


export const useNotifications = () => {
    const q = useQuery<Notification[]>({
        queryKey: ['notifications'],
        queryFn: async () => {
            const { data } = await api.get<Notification[]>(API_ROUTES.NOTIFICATIONS.NOTIFICATIONS);
            return data;
        },
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const { notifications, hasUnread } = useMemo(() => {
        const notifs = q.data ?? [];
        return {
            notifications: notifs,
            hasUnread: notifs.some((n) => !n.isRead)
        };
    }, [q.data]);

    return {
        notifications,
        hasUnread,
        isLoading: q.isLoading,
        isError: q.isError,
        refetch: q.refetch,
        query: q,
    };
};
