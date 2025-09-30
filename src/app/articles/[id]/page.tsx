"use client";
import { useParams } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { useGetArticleById } from '@/hooks/articles/useGetArticle';
import { useMe } from '@/hooks/auth/useMe';
import { CustomCircularProgress } from '@/styles/CustomCircuralProgress';
import { useArticleSocket } from '@/hooks/articles/useArticleSocket';
import { useGetComments } from '@/hooks/comment/useGetComments';
import { useCommentManagement } from '@/hooks/comment/useCommentManagement';
import { useCommentUI } from '@/hooks/comment/useCommentUI';
import { ArticleHeader } from '@/components/articles/ArticleHeader';
import { ArticleContent } from '@/components/articles/ArticleContent';
import { ArticleActions } from '@/components/articles/ArticleActions';
import { CommentSection } from '@/components/comments/CommentSection';
import { useGetArticleLikesCount } from '@/hooks/like/useGetArticleLikesCount';
import ArticleCategories from '@/components/articles/ArticleCategories';
import { useEffect } from 'react';
import { scrollToAndHighlight } from '@/utils/scrollToAndHighlight';
import { useTranslation } from 'react-i18next';


export default function ArticlePage() {
    const {t, ready} = useTranslation();
    const { id } = useParams<{ id: string }>();
    const { data: article, isLoading, isError } = useGetArticleById(id);
    const { data: user } = useMe();
    const { data: { comments = [], count: commentsCount = 0 } = {}, isLoading: isLoadingComments } = useGetComments(id);
    const { data: { likes=[], count: likesCount = 0 } = {}, isLoading: isLoadingLikes } = useGetArticleLikesCount(id);

    useArticleSocket(id);
    const commentManagement = useCommentManagement(id, user?.id || '');
    const commentUI = useCommentUI();

    useEffect(() => {
        const hash = window.location.hash;
        if (hash.startsWith("#comment-")) {
            const commentId = hash.replace("#comment-", "");
            scrollToAndHighlight(commentId);
        }
    }, [comments]);


    if (isLoading) return <CustomCircularProgress size={24} />;
    if (isError || !article) return <Typography>{t('article.errors.load_error')}</Typography>;

    if(!ready) return null;
    return (
        <Box
            maxWidth={600}
             mx="auto"
             py={5}
             sx={{
                px: { xs: 3, sm: 0 },
                pt: { xs: 3, sm: 5 },
             }}
        >
            <ArticleHeader article={article} />
            <ArticleContent article={article} />
            <ArticleCategories article={article} />
            <ArticleActions article={article} commentsCount={commentsCount} likes={likes} likesCount={likesCount} isLoadingLikes={isLoadingLikes} />
            <CommentSection
                comments={comments}
                isLoadingComments={isLoadingComments}
                user={user}
                commentManagement={commentManagement}
                commentUI={commentUI}
            />
        </Box>
    );
}