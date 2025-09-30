"use client";

import Typography from '@mui/material/Typography';
import React from 'react';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';

export default function AboutPage() {
    const theme = useTheme();
    const {t, ready} = useTranslation();

    if(!ready) return null;
    return (
        <Box
            sx={{
                fontFamily: 'sans-serif',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyItems: 'center',
                maxHeight: '100vh',
                p: { xs: 8, sm: 20 },
                pb: 20,
                gap: 10,
            }}
        >
            <Typography
                id="contact-title"
                variant="h6"
                component="h2"
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: {
                        xs: '1.5rem',
                        sm: '2rem',
                        md: '2.5rem',
                        lg: '3rem',
                    },
                    lineHeight: 1.2,
                }}
            >
                {t('about_us.title')}
            </Typography>

            <Typography
                id="contact-subtitle"
                variant="body1"
                component="h3"
                sx={{
                    textAlign: 'center',
                    whiteSpace: 'normal',
                    overflowWrap: 'break-word',
                    lineHeight: 1.2,
                }}
            >
                {t('about_us.subtitle')}
            </Typography>

            <Box
                sx={{
                    width: '100%',
                    maxWidth: 450,
                    boxShadow: '0 3px 24px 0 rgba(0,0,0,0.07)',
                    borderRadius: 4,
                    border: `1px solid ${theme.palette.divider}`,
                    p: { xs: 2.3, sm: 4 },
                    mx: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,

                }}
            >
                <Typography
                    id="contact-subtitle"
                    variant="body1"
                    component="h3"
                    sx={{
                        lineHeight: 1.2,
                    }}
                >
                    {t('about_us.h1')}
                </Typography>

                <Typography
                    id="contact-subtitle"
                    variant="body1"
                    component="h3"
                    sx={{
                        lineHeight: 1.2,
                    }}
                >
                    {t('about_us.h2')}
                </Typography>

                <Typography
                    id="contact-subtitle"
                    variant="body1"
                    component="h3"
                    sx={{
                        lineHeight: 1.2,
                    }}
                >
                    {t('about_us.h3')}
                </Typography>
            </Box>
        </Box>
    );
}
