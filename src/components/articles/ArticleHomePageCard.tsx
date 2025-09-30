import { Box, Button, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/routes/routes';
import { articleType } from '@/types/ArticleTypes';
import { useTranslation } from 'react-i18next';

interface ArticleHomePageCardProps {
    article: articleType;
}

export default function ArticleHomePageCard({ article }: ArticleHomePageCardProps) {
    const {t, ready}= useTranslation();
    const theme = useTheme();

    if(!ready) return null;
    return (
        <Box
            key={article.id}
            sx={{
                p: 2,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: 300,
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: 200,
                    borderRadius: 2,
                    overflow: "hidden",
                }}
            >
                <Image
                    src={article.linkIImage}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                />
            </Box>

            <Typography variant="h6" fontWeight="bold">
                {article.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
                {t('article.by')} {article.author.username}
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    lineHeight: "1.4rem",
                    maxHeight: "4.2rem",
                    whiteSpace: "normal",
                    "& p": { margin: 0 },
                    "& p + p": { marginTop: "0.5em" },
                }}
                dangerouslySetInnerHTML={{ __html: article.description }}
            />

            <Typography variant="caption" color="text.secondary">
                {new Date(article.createdAt).toLocaleDateString()}
            </Typography>


            <Button
                size="small"
                sx={{
                    width: '90px',
                    textTransform: 'none',
                    mt: 1,
                    border: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Link href={ROUTES.ARTICLE(article.id)} className={"w-full h-full"}>
                    {t('button.read_more')}
                </Link>
            </Button>


        </Box>
    );
}