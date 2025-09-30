import { Stack, Typography, Avatar, Box } from '@mui/material';
import Image from 'next/image';
import { articleType } from '@/types/ArticleTypes';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

interface ArticleHeaderProps {
    article: articleType;
}

export const ArticleHeader = ({ article }: ArticleHeaderProps) => {
    const { t, ready } = useTranslation();
    const theme = useTheme();

    const profile = article.author.profile;
    const displayName = profile
        ? `${profile.firstName} ${profile.lastName}`
        : article.author.username;

    if (!ready) return null;

    return (
        <>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                {article.title}
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Avatar
                    src={profile?.linkIImage || ''}
                    sx={{
                        width: 48,
                        height: 48,
                        border: `2px solid ${theme.palette.divider}`,
                    }}
                >
                    {!profile?.linkIImage && displayName[0]}
                </Avatar>
                <Box>
                    <Typography fontWeight={600}>{displayName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {new Date(article?.createdAt).toLocaleDateString()} •{' '}
                        {article.readingTime} {t('article.min_read')}
                    </Typography>
                </Box>
            </Stack>

            {article.linkIImage && (
                <Box
                    sx={{
                        borderRadius: 5,
                        overflow: 'hidden',
                        mb: 3,
                        border: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Image
                        src={article.linkIImage}
                        alt={article.title}
                        width={800}
                        height={340}
                        priority
                        style={{
                            width: "100%",
                            maxHeight: 340,
                            objectFit: "cover",
                            display: "block",
                        }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                    />
                </Box>
            )}
        </>
    );
};
