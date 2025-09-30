import { articleType } from '@/types/ArticleTypes';
import { Box, Divider } from '@mui/material';
import Chip from '@mui/material/Chip';

interface ArticleCategoriesProps {
    article: articleType;
}
export default function ArticleCategories({ article }: ArticleCategoriesProps) {
    const categories = article.categories || [];

    const normalizedCategories: string[] = Array.isArray(categories)
        ? categories
        : (categories as unknown as string).split(',').map(c => c.trim());
    return (
        <>
            <Divider sx={{ mb: 2 }} />
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 0.5,
                    overflow: 'hidden',
                    mb: 2,
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
        </>
    );
}