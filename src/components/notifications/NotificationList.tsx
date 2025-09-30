import React, { FC } from 'react';
import { List, Typography } from '@mui/material';
import {Notification} from "@/types/NotificationTypes";
import { NotificationItem } from './NotificationItem';
import { CustomCircularProgress } from '@/styles/CustomCircuralProgress';
import { useTranslation } from 'react-i18next';

interface NotificationListProps {
    notifications: Notification[];
    isLoading: boolean;
    onClick: (n: Notification) => void;
}

export const NotificationList: FC<NotificationListProps> = ({ notifications, isLoading, onClick }) => {
    const {t}= useTranslation();
    if (isLoading) {
        return <CustomCircularProgress size={24} />
    }

    if (notifications.length === 0) {
        return (
            <Typography sx={{ p: 2, color: 'text.secondary' }}>
                {t('notifications.noNotifications')}
            </Typography>
        );
    }

    return (
        <List>
            {notifications.map((n) => (
                <NotificationItem key={n.id} notification={n} onClick={onClick} />
            ))}
        </List>
    );
};
