import { CommentType } from '@/types/ArticleTypes';
import Stack from '@mui/material/Stack';
import { Avatar, Typography } from '@mui/material';
import Link from 'next/link';
import { ROUTES } from '@/routes/routes';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface CommentHeaderProps {
    comment: CommentType;
    level: number;
    maxLevelForIndent: number;
}

export const CommentHeader = ({ comment, level, maxLevelForIndent }: CommentHeaderProps) => {
        const {t, ready} = useTranslation();

        if(!ready) return null;
    return (
        <Stack direction="row" alignItems="center" gap={2} mb={0.5}>
            <Link href={ROUTES.PROFILE(comment.author.id)}>
                <Avatar sx={{ width: 36, height: 36 }} src={comment.author.profile?.linkIImage}>
                    {comment.author.username[0]}
                </Avatar>
            </Link>


            {level > maxLevelForIndent && (
                <Typography variant="caption" color="primary" sx={{ mr: 1 }}>
                    @{comment.parent?.author?.username || t('comments.comment_header.user')}
                </Typography>
            )}

            <Typography fontWeight={500}>
                {comment.author.profile
                    ? `${comment.author.profile.firstName} ${comment.author.profile.lastName}`
                    : comment.author.username}
            </Typography>

            {level > maxLevelForIndent && (
                <Typography variant="caption" color="text.secondary">
                    {t('comments.comment_header.level',{ level: level+1})}
                </Typography>
            )}
        </Stack>
    );
}


