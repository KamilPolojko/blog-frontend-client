'use client';

import React from 'react';
import { Box, Button, TextField, Typography, Alert, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSendContactUsMessage } from '@/hooks/contact/useSendContactUsMessage';
import { ContactUsRequest } from '@/types/ContactUsTypes';
import { useTranslation } from 'react-i18next';

export default function ContactPage() {
    const theme = useTheme();
    const { t, ready } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactUsRequest>({ mode: 'onChange' });

    const { mutate, isPending, isSuccess, isError } = useSendContactUsMessage();

    const handleContactSubmit = (data: ContactUsRequest) => {
        mutate(data, {
            onSuccess: () => reset(),
        });
    };

    if (!ready) return null;

    return (
        <Box
            sx={{
                fontFamily: 'sans-serif',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
                p: { xs: 3, sm: 6 },
                gap: 4,
            }}
        >
            <Typography
                variant="h3"
                fontWeight="bold"
                textAlign="center"
                sx={{ lineHeight: 1.2 }}
            >
                {t('contact.contact_us')}
            </Typography>

            <Typography variant="body1" textAlign="center">
                {t('contact.question')}
            </Typography>

            <Box
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    boxShadow: 3,
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    p: { xs: 3, sm: 5 },
                }}
            >
                <form onSubmit={handleSubmit(handleContactSubmit)}>
                    <Box display="flex" flexDirection="column" gap={3}>
                        <TextField
                            label={t('form_fields.name.label')}
                            {...register('Name', { required: t('form_fields.name.errors.required') })}
                            error={!!errors.Name}
                            helperText={errors.Name?.message?.toString()}
                            autoComplete="name"
                            fullWidth
                        />

                        <TextField
                            label={t('form_fields.mail.email.label')}
                            type="email"
                            {...register('Email', {
                                required: t('form_fields.mail.errors.required'),
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: t('form_fields.mail.errors.pattern.message'),
                                },
                            })}
                            error={!!errors.Email}
                            helperText={errors.Email?.message?.toString()}
                            autoComplete="email"
                            fullWidth
                        />

                        <TextField
                            label={t('form_fields.subject.label')}
                            {...register('Subject', { required: t('form_fields.subject.errors.required') })}
                            error={!!errors.Subject}
                            helperText={errors.Subject?.message?.toString()}
                            fullWidth
                        />

                        <TextField
                            label={t('form_fields.message.label')}
                            {...register('Message', { required: t('form_fields.message.errors.required') })}
                            error={!!errors.Message}
                            helperText={errors.Message?.message?.toString()}
                            multiline
                            rows={5}
                            fullWidth
                        />

                        <Box textAlign="center" mt={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isPending}
                                sx={{
                                    backgroundColor: theme.palette.text.primary,
                                    color: theme.palette.background.default,
                                    borderRadius: 2,
                                    px: 4,
                                    '&:hover': {
                                        backgroundColor: theme.palette.background.default,
                                        color: theme.palette.text.primary,
                                    },
                                }}

                            >
                                {isPending ? t('contact.isPending') : t('button.submit')}
                            </Button>
                        </Box>

                        {isSuccess && <Alert severity="success">{t('contact.isSuccess')}</Alert>}
                        {isError && <Alert severity="error">{t('contact.isError')}</Alert>}
                    </Box>
                </form>
            </Box>
        </Box>
    );
}
