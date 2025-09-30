import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { articleType } from '@/types/ArticleTypes';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Link from 'next/link';
import {ROUTES} from "@/routes/routes";
import SaveArticleCount from "@/components/buttons/SaveArticleCount";
import { ArticleLikeButton } from '@/components/buttons/likeButton/ArticleLikeButton';
import { Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ArticleCardProps {
    article: articleType;
    invalidateArticleList?: boolean;
    invalidateSingleArticle?: boolean;
    optimistic?: boolean;
}

export default function ArticleCard({ article, invalidateArticleList, invalidateSingleArticle, optimistic }: ArticleCardProps) {
    const theme = useTheme();
    const {t, ready} = useTranslation();
    const {
        linkIImage,
        title,
        description,
        author,
        categories,
        likes,
        comments,
        id,
    } = article;

    const authorAvatar =
        author?.profile?.linkIImage && author?.profile?.linkIImage.trim() !== ''
            ? author.profile.linkIImage
            : undefined;

    const authorName =
        author?.profile?.firstName && author?.profile?.lastName
            ? `${author.profile.firstName} ${author.profile.lastName}`
            : author?.username || t('article.anonymous');

    const normalizedCategories: string[] = Array.isArray(categories)
        ? categories
        : (categories as string).split(',').map(c => c.trim());

    if(!ready) return null;
    return (
        <Link href={ROUTES.ARTICLE(article.id)}>
        <Card sx={{ width: 340, margin: 'auto', borderRadius: 3, boxShadow: 3, display: 'flex', flexDirection: 'column', height: 460, backgroundColor: theme.palette.background.default }}>
            {linkIImage && (
                <CardMedia
                    component="img"
                    sx={{
                        height: 200,
                        objectFit: 'cover',
                        background: '#f5f5f5',
                        width: '100%',
                        borderRadius: '8px 8px 0 0',
                    }}
                    image={linkIImage}
                    alt={title}
                />

            )}
            <CardHeader
                avatar={
                    <Avatar src={authorAvatar} sx={{ width: 36, height: 36 }}>
                        {!authorAvatar && authorName[0]}
                    </Avatar>
                }
                title={
                    <Typography variant="subtitle1" fontWeight="bold">
                        {authorName}
                    </Typography>
                }
                sx={{
                    px: 2,
                    pt: 1,
                    pb: 0,
                }}
            />
            <CardContent sx={{ flex: 1, minHeight: 0 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                {title}
            </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        lineHeight: '1.4rem',
                        maxHeight: '4.2rem',
                        whiteSpace: 'normal',
                        "& p": { margin: 0 },
                        "& p + p": { marginTop: "0.5em" },
                    }}

                    dangerouslySetInnerHTML={{ __html: description }}
                />

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.5,
                        maxHeight: (24 + 4) * 2,
                        overflow: 'hidden',
                        mt: 2,
                    }}
                >
                    {normalizedCategories.map((tag: string) => (
                        <Chip
                            key={tag}
                            label={tag}
                            size="small"
                        />
                    ))}
                </Box>
        </CardContent>
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
                        <Typography>{likes?.length ?? 0}</Typography>
                        <ArticleLikeButton articleId={id} likes={likes} />

                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Typography variant="body2" color="text.secondary">
                            {comments?.length ?? 0}
                        </Typography>
                        <ModeCommentOutlinedIcon fontSize="small" />
                    </Stack>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <SaveArticleCount
                        article={article}
                        invalidateArticleList={invalidateArticleList}
                        invalidateSingleArticle={invalidateSingleArticle}
                        optimistic={optimistic}
                    />
                </Stack>
            </CardActions>

        </Card>
        </Link>
    );
}
