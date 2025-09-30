import React, { FC } from 'react';
import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    Box, ListItemButton,
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import {Notification} from "@/types/NotificationTypes";
import { useTranslation } from 'react-i18next';
import { enUS, pl } from 'date-fns/locale';


interface NotificationItemProps {
    notification: Notification;
    onClick: (n: Notification) => void;
}

export const NotificationItem: FC<NotificationItemProps> = ({ notification, onClick }) => {
    const {t, i18n} = useTranslation();
    const locale = i18n.language === 'pl'? pl : enUS;
    const { id, type, isRead, createdAt, actor } = notification;

    const getText = () => {
        switch (type) {
            case 'ARTICLE_LIKED':
                return `${actor?.username ?? t('notifications.user')} ${t('notifications.article_liked')}`;
            case 'COMMENT_ADDED':
                return `${actor?.username ?? t('notifications.user')} ${t('notifications.comment_added')}`;
            case 'REPLY_ADDED':
                return `${actor?.username ?? t('notifications.user')} ${t('notifications.reply_added')}`;
            case 'COMMENT_LIKED':
                return `${actor?.username ?? t('notifications.user')} ${t('notifications.comment_liked')}`;
            case 'ARTICLE_SAVED':
                return `${actor?.username ?? t('notifications.user')} ${t('notifications.article_saved')}`;
            default:
                return t('notifications.new_notification');
        }
    };

    return (
        <ListItem
            key={id}
            sx={{
                backgroundColor: isRead ? 'transparent' : 'rgba(25, 118, 210, 0.06)',
                mb: 0.5,
                borderRadius: 1,
            }}
            disablePadding
        >
            <ListItemButton onClick={() => onClick(notification)} sx={{ borderRadius: 1 }}>
                <ListItemAvatar>
                    <Avatar src={actor?.profile?.linkIImage}>
                        {actor?.username?.[0]}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box>
                                <Typography variant="body2" fontWeight={600}>
                                    {type.replaceAll('_', ' ')}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {getText()}
                                </Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                                {formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale })}
                            </Typography>
                        </Box>
                    }
                />
            </ListItemButton>
        </ListItem>
    );
};
