import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

interface CollapseThreadButtonProps {
    commentId: string;
    totalReplies: number;
    isCollapsed: boolean;
    toggle: (id: string) => void;
}

export const CollapseThreadButton = ({
                                         commentId,
                                         totalReplies,
                                         isCollapsed,
                                         toggle,
                                     }: CollapseThreadButtonProps) => {
    const {t, ready} = useTranslation();

    const replyWord = totalReplies === 1 ? t("thread.reply_singular") : t("thread.reply_plural");

    if(!ready) return null;
    return (
        <Box sx={{ my: 2 }}>
            <Button
                size="small"
                variant="outlined"
                onClick={() => toggle(commentId)}
                sx={{
                    textTransform: "none",
                    borderColor: "#e0e0e0",
                    color: "text.secondary",
                    "&:hover": {
                        borderColor: "#bdbdbd",
                        backgroundColor: "#f5f5f5",
                    },
                }}
            >
                {isCollapsed
                    ? `▶ ${t("thread.expand")} (${totalReplies} ${replyWord})`
                    : `▼ ${t("thread.collapse")} (${totalReplies} ${replyWord})`}
            </Button>
        </Box>
    );

}
