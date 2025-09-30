import React, { useState } from "react";
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { useTranslation } from 'react-i18next';

export default function ArticleImagePreview({
                                                previewImage,
                                                setPreviewImage,
                                                fieldState,
                                            }: {
    previewImage: string | null;
    setPreviewImage: (val: string | null) => void;
    fieldState?:{ error?: { message?: string }};
}) {
    const {t, ready}= useTranslation();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const theme = useTheme();

    if(!ready) return null;
    return (
        <>
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: 800,
                    height: 400,
                    border: `2px solid ${
                        fieldState?.error ? theme.palette.error.main : theme.palette.divider
                    }`,
                    borderRadius: "8px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: previewImage ? "pointer" : "default",
                }}
                onClick={() => previewImage && setIsFullscreen(true)}
            >
                {previewImage ? (
                    <>
                        <Image
                            src={previewImage}
                            alt="Podgląd zdjęcia artykułu"
                            width={800}
                            height={300}
                            style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                            }}
                        />
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                setPreviewImage(null);
                            }}
                            sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                bgcolor: theme.palette.action.disabledBackground,
                                color: theme.palette.getContrastText(
                                    theme.palette.action.disabledBackground
                                ),
                                transition: "all 0.2s ease-in-out",
                                "&:hover": {
                                    bgcolor: theme.palette.action.active,
                                    transform: "scale(1.1)",
                                },
                                "&:active": {
                                    transform: "scale(0.9)",
                                },
                            }}
                            size="small"
                        >
                            <CloseIcon />
                        </IconButton>
                    </>
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        {t('preview.no_image')}
                    </Typography>
                )}
            </Box>

            {fieldState?.error && (
                <Typography color="error.main" variant="caption">
                    {fieldState.error.message}
                </Typography>
            )}

            {isFullscreen && previewImage && (
                <Box
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        bgcolor: "rgba(0,0,0,0.4)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 2000,
                    }}
                    onClick={() => setIsFullscreen(false)}
                >
                    <IconButton
                        onClick={() => setIsFullscreen(false)}
                        sx={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            color: theme.palette.common.white,
                            bgcolor: "rgba(0,0,0,0.5)",
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                                bgcolor: "rgba(0,0,0,0.7)",
                                transform: "scale(1.1)",
                            },
                            "&:active": {
                                transform: "scale(0.9)",
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Image
                        src={previewImage}
                        alt="Podgląd artykułu - fullscreen"
                        width={1200}
                        height={800}
                        style={{
                            objectFit: "contain",
                            maxWidth: "90%",
                            maxHeight: "90%",
                        }}
                    />
                </Box>
            )}
        </>
    );
}
