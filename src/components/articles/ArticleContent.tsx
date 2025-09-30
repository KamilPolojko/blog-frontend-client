import { Typography } from '@mui/material';

interface ArticleContentProps {
    article: {
        content: string;
    };
}

export const ArticleContent = ({ article }: ArticleContentProps) => {
    return (
        <Typography
            className="article-content"
            variant="body1"
            fontSize={19}
            lineHeight={1.8}
            mb={3}
            sx={{
                p: 2,
                "& p": { margin: 0 },
                "& p + p": { marginTop: "0.5em" },
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
            }}
            dangerouslySetInnerHTML={{
                __html: article.content.replace(/\n/g, '<br>'),
            }}
        />
    );
};