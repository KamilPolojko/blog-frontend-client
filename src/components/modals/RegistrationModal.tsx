"use client";

import React, { useState } from 'react';
import DynamicFormModal from './DynamicFormModal';
import { Button } from '@mui/material';
import {useRegister} from "@/hooks/auth/useRegister";
import {useForm} from "react-hook-form";
import { RegisterRequest } from '@/types/AuthTypes';
import { useTranslation } from 'react-i18next';

interface RegistrationModalProps {
    setOpenLogin: (openLogin: boolean) => void;
}

function RegisterModal({ setOpenLogin }: RegistrationModalProps) {
    const {t, ready} = useTranslation();
    const [openRegister, setOpenRegister] = useState(false);

    const form = useForm();
    const { mutate, isPending, isSuccess, isError } = useRegister();

    const handleRegisterSubmit = (data: RegisterRequest) => {

        mutate(data, {
            onSuccess: (res) => {
                console.log('Rejestracja udana:', res);
            },
            onError: (err) => {
                console.error('Błąd rejestracji:', err);
            },
        });
    };

    if(!ready) return null;
    return (
        <>
            <Button
                onClick={() => setOpenRegister(true)}
                variant="outlined"
                sx={{
                    borderColor: '#808080',
                    color: '#808080',
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
                    transition: 'color 0.2s, border-color 0.2s',
                    '&:hover': {
                        borderColor: '#666666',
                        color: '#666666',
                        backgroundColor: 'transparent',
                    },
                }}
            >
                {t('button.register_in')}
            </Button>

            <DynamicFormModal
                open={openRegister}
                onClose={() => setOpenRegister(false)}
                title={t('registration_modal.title')}
                submitButtonText={isPending ? t('registration_modal.isPending') : t('button.register_in')}
                form={form}
                fields={[
                    {
                        name: 'username',
                        label: t('form_fields.username.label'),
                        placeholder: t('form_fields.username.placeholder'),
                        validation: { required: t('form_fields.username.errors.required') },
                    },
                    {
                        name: 'email',
                        label: t('form_fields.mail.email.label'),
                        type: 'email',
                        placeholder:  t('form_fields.mail.email.placeholder'),
                        validation: {
                            required: t('form_fields.mail.errors.required'),
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: t('form_fields.mail.errors.pattern.message'),
                            },
                        },
                    },
                    {
                        name: 'password',
                        label: t('form_fields.password.password.label'),
                        type: 'password',
                        placeholder: t('form_fields.password.password.placeholder'),
                        validation: {
                            required: t('form_fields.password.errors.required'),
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/,
                                message: t('form_fields.password.errors.pattern.message'),
                            },
                        },
                    },
                    {
                        name: 'passwordRepeat',
                        label: t('form_fields.password.repeatNewPassword.label'),
                        type: 'password',
                        placeholder: t('form_fields.password.repeatNewPassword.placeholder'),
                        validation: {
                            required: t('form_fields.password.errors.required'),
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/,
                                message: t('form_fields.password.errors.pattern.message'),
                            },
                        },
                    },
                ]}
                onSubmit={handleRegisterSubmit}
                extraComponents={
                    <div className="flex flex-col items-center gap-2">
                        <button
                            type="button"
                            className="mt-2 text-gray-500 hover:text-black text-sm"
                            onClick={() => {
                                setOpenRegister(false);
                                setOpenLogin(true);
                            }}
                        >
                            {t('button.log_in')}
                        </button>

                        {isSuccess && (
                            <p className="text-green-500 text-sm mt-1">
                                {t('registration_modal.isSuccess')}
                            </p>
                        )}

                        {isError && (
                            <p className="text-red-500 text-sm mt-1">
                                {t('registration_modal.isError')}
                            </p>
                        )}
                    </div>
                }
            />
        </>
    );
}

export default RegisterModal;
