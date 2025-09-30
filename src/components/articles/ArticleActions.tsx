import { Stack, Typography, Divider } from '@mui/material';
import { CardActions } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SaveArticleCount from '@/components/buttons/SaveArticleCount';
import { articleType, LikeType } from '@/types/ArticleTypes';
import { ArticleLikeButton } from '@/components/buttons/likeButton/ArticleLikeButton';
import { CustomCircularProgress } from '@/styles/CustomCircuralProgress';

interface ArticleActionsProps {
    article: articleType;
    likes: LikeType[];
    likesCount: number;
    isLoadingLikes?: boolean;
    commentsCount: number;
}

export const ArticleActions = ({ article, likes, likesCount, isLoadingLikes, commentsCount,  }: ArticleActionsProps) => {
    return (
        <>
            <Divider sx={{ mb: 2 }} />
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 2,
                    pt: 1,
                    pb: 1,
                }}
            >
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Stack direction="row" alignItems="center" gap={0.5}>
                        <ArticleLikeButton articleId={article.id} likes={likes} />
                        {isLoadingLikes ? (
                            <CustomCircularProgress size={20} />
                        ):(
                            <Typography>{likesCount?? 0}</Typography>
                        )}
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={0.5}>
                        <ChatBubbleOutlineIcon />
                        <Typography>{commentsCount}</Typography>
                    </Stack>
                </Stack>
                <SaveArticleCount
                    article={article}
                    invalidateSingleArticle={true}
                />
            </CardActions>
        </>
    );
};
