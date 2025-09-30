import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {Notification} from "@/types/NotificationTypes";
import ioClient from 'socket.io-client';


export const useNotificationSocket = (userId?: string) => {
    const qc = useQueryClient();

    useEffect(() => {
        if (!userId) return;

        const socket = ioClient(process.env.NEXT_PUBLIC_WS_URL as string, {
            transports: ['websocket', 'polling'],
        });

        socket.on('connect', () => {
            socket.emit('subscribeNotifications', userId);
        });

        const handleNew = (notification: Notification) => {
            qc.setQueryData<Notification[]>(['notifications'], (old = []) => [notification, ...old]);

            qc.invalidateQueries({queryKey: ['notifications']});
        };

        socket.on('newNotification', handleNew);

        return () => {
            socket.off('newNotification', handleNew);
            socket.disconnect();
        };
    }, [userId, qc]);
};
