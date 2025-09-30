import React, { useState } from 'react';

import { Button, Typography, useTheme, Stack, Box } from '@mui/material';
import DynamicFormModal from '@/components/modals/DynamicFormModal';
import ForgotPasswordModal from '@/components/modals/ForgotPasswordModal';
import {useForm} from "react-hook-form";
import {useLogin} from "@/hooks/auth/useLogin";
import { useTranslation } from 'react-i18next';
import { usePasswordReset } from '@/hooks/auth/usePasswordReset';

interface LoginModalProps {
    setOpenLogin: (openLogin: boolean) => void;
    openLogin: boolean;
}

function LoginModal({ setOpenLogin, openLogin }: LoginModalProps) {
    const theme = useTheme();
    const {t, ready} = useTranslation();
    const [openForgot, setOpenForgot] = useState(false);
    const form = useForm();

    const { mutate: login, isPending, isError, isSuccess } = useLogin();

    const handleLoginSubmit = (data: any) => {
        login(data, {
            onSuccess: () => {
                setOpenLogin(false);
            }
        });
    };

    if(!ready) return null;
    return (
        <>
            <Button
                onClick={() => setOpenLogin(true)}
                sx={{
                    backgroundColor: theme.palette.text.primary,
                    color: theme.palette.background.default,
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    px: { xs: 2, md: 3 },
                    py: { xs: 2, md: 3 },
                    fontSize: { xs: '0.5rem', md: '0.8rem', lg: '1.125rem' },
                    width: { xs: 70, md: 120, lg: 'auto' },
                    height: { xs: 30, md: 50, lg: 'auto' },
                    maxWidth: 180,
                    maxHeight: 50,
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary,
                    },
                }}
            >
                {t('button.log_in')}
            </Button>

            <DynamicFormModal
                open={openLogin}
                onClose={() => setOpenLogin(false)}
                title={t('login_modal.title')}
                form={form}
                submitButtonText={isPending ? t('login_modal.isPending') : t('button.log_in')}
                fields={[
                    {
                        name: 'email',
                        label: t('form_fields.mail.email.label'),
                        placeholder: t('form_fields.mail.email.placeholder'),
                        validation: { required: t('form_fields.mail.errors.required') },
                    },
                    {
                        name: 'password',
                        label: t('form_fields.password.password.label'),
                        type: 'password',
                        placeholder: t('form_fields.password.password.placeholder'),
                        validation: { required: t('form_fields.password.errors.required') },
                    },
                ]}
                onSubmit={handleLoginSubmit}
                extraComponents={
                    <Stack spacing={1} alignItems="center" sx={{ width: '100%', mt: 1 }}>
                        <Typography
                            component="button"
                            type="button"
                            onClick={() => {
                                setOpenLogin(false);
                                setOpenForgot(true);
                            }}
                            sx={{
                                color: 'gray',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                background: 'none',
                                border: 'none',
                                p: 0,
                                fontSize: '0.875rem',
                            }}
                        >
                            {t('forgot_password_modal.title')}
                        </Typography>

                        {isSuccess && (
                            <Typography 
                                sx={{ 
                                    color: 'success.main', 
                                    fontSize: '0.875rem',
                                    textAlign: 'center',
                                }}
                            >
                                {t('login_modal.isSuccess')}
                            </Typography>
                        )}
                        {isError && (
                            <Typography 
                                sx={{ 
                                    color: 'error.main', 
                                    fontSize: '0.875rem',
                                    textAlign: 'center',
                                }}
                            >
                                {t('login_modal.isError')}
                            </Typography>
                        )}
                    </Stack>
                }
            />

            <ForgotPasswordModal
                openForgot={openForgot}
                setOpenForgot={setOpenForgot}
            />
        </>
    );
}

export default LoginModal;