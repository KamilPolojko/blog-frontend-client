'use client';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useLoginModal } from '@/context/LoginModalContext';
import { useAddSavedArticle } from '@/hooks/savedArticles/useAddSavedArticle';
import { useDeleteSavedArticle } from '@/hooks/savedArticles/useDeleteSavedArticle';
import { useMe } from '@/hooks/auth/useMe';
import { articleType } from '@/types/ArticleTypes';
import { useTranslation } from 'react-i18next';

interface SaveArticleButtonProps {
    article?: articleType;
    optimistic?: boolean;
    invalidateArticleList?: boolean;
    invalidateSingleArticle?: boolean;
    localSaved?: boolean | null;
    setLocalSaved?: (saved: boolean) => void;
}

export default function SaveArticleButton({
                                              article,
                                              optimistic = false,
                                              invalidateArticleList,
                                              invalidateSingleArticle,
                                              localSaved,
                                              setLocalSaved
                                          }: SaveArticleButtonProps) {
    const {t, ready} = useTranslation();
    const { data: user } = useMe();
    const { setLoginOpen } = useLoginModal();
    const { mutate: addSaved } = useAddSavedArticle({
        invalidateArticleList,
        invalidateSingleArticle,
    });
    const { mutate: removeSaved } = useDeleteSavedArticle({
        invalidateArticleList,
        invalidateSingleArticle,
    });

    const [isSaving, setIsSaving] = useState(false);
    const [animate, setAnimate] = useState(false);

    const isSavedFromUser = article?.savedBy.some(a => a.id === user?.id) ?? false;

    const isSaved = optimistic && localSaved !== undefined && localSaved !== null
        ? localSaved
        : isSavedFromUser;

    const handleClick = () => {
        if (!user?.id) {
            setLoginOpen(true);
            return;
        }

        setIsSaving(true);
        setAnimate(true);

        const variables = { userId: user?.id, articleId: article?.id };

        if (isSaved) {
            if (optimistic && setLocalSaved) setLocalSaved(false);

            removeSaved(variables, {
                onSettled: () => {
                    setIsSaving(false);
                    setAnimate(false);
                },
            });
        } else {
            if (optimistic && setLocalSaved) setLocalSaved(true);
            addSaved(variables, {
                onSettled: () => {
                    setIsSaving(false);
                    setAnimate(false);
                },
            });
        }
    };


    if(!ready) return null;
    return (
        <IconButton
            onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                handleClick();
            }}
            sx={{
                color: isSaved ? '#FFD700' : 'grey.600',
                transition: 'color 0.3s ease',
                animation: animate ? 'save-flash 0.6s ease forwards' : 'none',
                '&:hover': {
                    color: isSaved ? '#FFC107' : 'primary.main',
                },
                '@keyframes save-flash': {
                    '0%': { transform: 'scale(1)', filter: 'brightness(1)' },
                    '50%': { transform: 'scale(1.4)', filter: 'brightness(1.6)' },
                    '100%': { transform: 'scale(1)', filter: 'brightness(1)' },
                },
            }}
            disabled={isSaving}
            aria-label={isSaved ? t('save_article_button.isSaved') : t('save_article_button.isNotSaved')}
            title={isSaved ? t('save_article_button.isSaved') : t('save_article_button.isSaved')}
        >
            {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
    );
}
