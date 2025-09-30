import {articleType} from "@/types/ArticleTypes";
import Typography from "@mui/material/Typography";
import SaveArticleButton from "@/components/buttons/SaveArticleButton";
import {useState} from "react";
import { Box } from '@mui/material';

interface SaveArticleCountProps {
    article: articleType;
    optimistic?: boolean;
    invalidateArticleList?: boolean;
    invalidateSingleArticle?: boolean;
}
export default function SaveArticleCount({
                                             article,
                                             optimistic = false,
                                             invalidateArticleList,
                                             invalidateSingleArticle
                                         }: SaveArticleCountProps) {
    const [localSaved, setLocalSaved] = useState<boolean | null>(null);
    const [localCount, setLocalCount] = useState<number>(article.savedByCount ?? 0);

    const handleLocalSaveChange = (saved: boolean) => {
        setLocalSaved(saved);
        setLocalCount(prev => saved ? prev + 1 : prev - 1);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.1 }}>
            <Typography>{optimistic ? localCount : (article.savedByCount ?? 0)}</Typography>
            <SaveArticleButton
                article={article}
                optimistic={optimistic}
                invalidateArticleList={invalidateArticleList}
                invalidateSingleArticle={invalidateSingleArticle}
                localSaved={optimistic ? localSaved : null}
                setLocalSaved={optimistic ? handleLocalSaveChange : undefined}
            />
        </Box>
    );
}