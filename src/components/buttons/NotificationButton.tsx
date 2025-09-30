'use client';

import React, { useState } from 'react';
import {
    IconButton,
    Badge,
    Popover,
    Box,
    Divider,
    Typography, useTheme,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

import { useMe } from '@/hooks/auth/useMe';
import { useRouter } from 'next/navigation';
import { useNotifications } from '@/hooks/notifications/useGetNotifications';
import { useMarkNotificationRead } from '@/hooks/notifications/useMarkNotificationRead';
import { useNotificationSocket } from '@/hooks/notifications/useNotificationSocket';
import {Notification} from "@/types/NotificationTypes";
import { NotificationList } from '@/components/notifications/NotificationList';
import { scrollToAndHighlight } from '@/utils/scrollToAndHighlight';
import { useTranslation } from 'react-i18next';

const getNotificationUrl = (n: Notification) => {
    if (n.comment) {
        return `/articles/${n.article.id}#comment-${n.comment.id}`;
    }
    return `/articles/${n.article.id}`;
};


export const NotificationsButton = () => {
    const theme = useTheme();
    const {t , ready} = useTranslation();
    const { data: user } = useMe();
    useNotificationSocket(user?.id);

    const { notifications, hasUnread, isLoading } = useNotifications();

    const { markAsRead } = useMarkNotificationRead();
    const router = useRouter();

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const open = Boolean(anchor);

    const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchor(e.currentTarget);
    const handleClose = () => setAnchor(null);

    const handleClick = async (n: Notification) => {
        if (!n.isRead) {
            try {
                await markAsRead(n.id);
            } catch (e) {
                console.error("mark read error", e);
            }
        }

        const url = getNotificationUrl(n);
        handleClose();
        router.push(url);

        if (n.comment?.id) {
            scrollToAndHighlight(n.comment.id, 300);
        }
    };


    if(!ready) return null;
    return (
        <>
            <IconButton onClick={handleOpen}>
                <Badge
                    variant="dot"
                    color="error"
                    invisible={!hasUnread}
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    sx={{
                        '& .MuiBadge-dot': {
                            boxShadow: '0 0 0 2px #fff',
                            height: 10,
                            minWidth: 10,
                            borderRadius: '50%',
                        },
                    }}
                >
                    {open ? (
                        <NotificationsIcon sx={{ color: theme.palette.primary.contrastText }} />
                    ) : (
                        <NotificationsNoneOutlinedIcon sx={{ color: theme.palette.primary.contrastText }} />
                    )}
                </Badge>
            </IconButton>

            <Popover
                open={open}
                anchorEl={anchor}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Box sx={{ width: 360, maxHeight: 420, overflowY: 'auto', p: 1 }}>
                    <Typography variant="subtitle1" sx={{ px: 1, py: 0.5 }}>
                        {t('notifications.notifications')}
                    </Typography>
                    <Divider />
                    <NotificationList
                        notifications={notifications}
                        isLoading={isLoading}
                        onClick={handleClick}
                    />
                </Box>
            </Popover>
        </>
    );
};
