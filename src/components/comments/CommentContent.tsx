import React, { useState } from "react";
import { Typography, Button, Dialog, DialogContent, DialogTitle, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function CommentContent({ content }: { content: string }) {
    const {t, ready} = useTranslation();
    const [open, setOpen] = useState(false);

    if(!ready) return null;
    return (
        <>
            <Typography
                sx={{
                    whiteSpace: "pre-line",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    textOverflow: "ellipsis",
                }}
            >
                {content}
            </Typography>

            {content.length >= 50 && (
                <Button
                    size="small"
                    onClick={() => setOpen(true)}
                    sx={{ textTransform: "none", p: 0, minWidth: "auto" }}
                >
                    {t('comments.comment_content.full_comment')}
                </Button>
            )}

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="sm"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: 2,
                        p: 1,
                    },
                }}
                scroll="paper"
            >
                <DialogTitle>
                    {t('comments.comment_content.comment')}
                </DialogTitle>
                <DialogContent
                    dividers
                    sx={{
                        px: { xs: 2, sm: 3 },
                        py: 2,
                        "& > *": { minWidth: 0 },
                    }}
                >
                    <Box sx={{ pr: { xs: 0, sm: 1 } }}>
                        <Typography
                            variant="body1"
                            sx={{
                                whiteSpace: "pre-line",
                            }}
                        >
                            {content}
                        </Typography>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}
