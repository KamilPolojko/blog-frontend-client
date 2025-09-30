import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import ioClient from 'socket.io-client';

export const useArticleSocket = (articleId: string) => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const socket = ioClient(process.env.NEXT_PUBLIC_WS_URL as string, {
            transports: ['websocket', 'polling'],
        });

        socket.on("connect", () => {
            socket.emit("subscribeArticle", articleId);
        });

        const handleInvalidateComment = () => {
            queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
        };

        socket.on('articleLiked', ({ articleId, likesCount }: { articleId: string; likesCount: number }) => {
            queryClient.setQueryData(['articleLikesCount', articleId], (old: any) => ({
                ...old,
                count: likesCount,
            }));
        });

        socket.on('articleUnliked', ({ articleId, likesCount }: { articleId: string; likesCount: number }) => {
            queryClient.setQueryData(['articleLikesCount', articleId], (old: any) => ({
                ...old,
                count: likesCount,
            }));
        });

        socket.on('newComment', handleInvalidateComment);
        socket.on('deletedComment', handleInvalidateComment);
        socket.on('editedComment', handleInvalidateComment);

        socket.on('commentLiked', ({ commentId, likesCount }: { commentId: string; likesCount: number }) => {
            queryClient.setQueryData<number>(
                ['commentLikesCount', commentId],
                likesCount
            );
        });

        socket.on('commentUnliked', ({ commentId, likesCount }: { commentId: string; likesCount: number }) => {
            queryClient.setQueryData<number>(
                ['commentLikesCount', commentId],
                likesCount
            );
        });

        return () => {
            socket.disconnect();
        };
    }, [articleId, queryClient]);
};