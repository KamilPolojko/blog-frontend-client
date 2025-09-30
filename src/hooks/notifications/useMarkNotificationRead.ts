import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {Notification} from "@/types/NotificationTypes";
import { api } from '@/request';
import { API_ROUTES } from '@/routes/api_routes';

export const useMarkNotificationRead = () => {
    const qc = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (id: string) => {
            await api.patch(API_ROUTES.NOTIFICATIONS.MARK_NOTIFICATION(id), {}, { withCredentials: true });
        },
        onMutate: async (id: string) => {
            await qc.cancelQueries({ queryKey: ['notifications']});
            const previous = qc.getQueryData<Notification[]>(['notifications']);
            qc.setQueryData<Notification[]>(['notifications'], (old = []) =>
                old.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
            );
            return { previous };
        },
        onError: (_err, _id, context: any) => {
            if (context?.previous) {
                qc.setQueryData(['notifications'], context.previous);
            }
        },
        onSettled: () => {
            qc.invalidateQueries({queryKey: ['notifications']});
        },
    });

    const markAsRead = useCallback(
        (id: string) => mutation.mutateAsync(id),
        [mutation],
    );

    return {
        markAsRead,
        ...mutation,
    };
};
