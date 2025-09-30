"use client";

import DynamicFormModal from '@/components/modals/DynamicFormModal';
import React from 'react';
import {useForm} from "react-hook-form";
import {useChangeEmail} from "@/hooks/profile/useChangeEmail";
import {Typography} from "@mui/material";
import {useMe} from "@/hooks/auth/useMe";
import { useTranslation } from 'react-i18next';

export interface ChangeMailResponseType {
    newEmail: string;
    repeatNewEmail: string;
}

interface ChangeMailModalProps {
    setOpenChangeEmail: (openForgot: boolean) => void;
    openChangeEmail: boolean;
}

function ChangeMailModal({
    setOpenChangeEmail,
    openChangeEmail,
}: ChangeMailModalProps) {
    const {t, ready} = useTranslation();
    const { data: client } = useMe();
    const form = useForm<ChangeMailResponseType>();
    const { mutate: changeEmail, isSuccess, isError, reset } = useChangeEmail();

    const onSubmit = (data: ChangeMailResponseType) => {

        const formData = new FormData();

        if(client) formData.append('email', client.email);

        formData.append('newEmail', data.newEmail);
        formData.append('repeatNewEmail', data.repeatNewEmail);

        changeEmail(formData);
    }

    if (!ready) return null;
    return (
        <DynamicFormModal
            open={openChangeEmail}
            onClose={() => {
                setOpenChangeEmail(false);
                reset();
            }}
            title={t('mail_modal.title')}
            form={form}
            submitButtonText={t('button.submit')}
            fields={[
                {
                    name: 'newEmail',
                    label: t('form_fields.mail.newEmail.label'),
                    type: 'email',
                    placeholder: 'Email',
                    validation: {
                        required: t('form_fields.mail.errors.required'),
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: t('form_fields.mail.errors.pattern.message'),
                        },
                    },
                },
                {
                    name: 'repeatNewEmail',
                    label: t('form_fields.mail.repeatNewEmail.label'),
                    type: 'email',
                    placeholder: 'Email',
                    validation: {
                        required: t('form_fields.mail.errors.required'),
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: t('form_fields.mail.errors.pattern.message'),
                        },
                    },
                },
            ]}
            onSubmit={form.handleSubmit((data) => {
                onSubmit(data);
                form.reset();
            })}
            extraComponents={
                isError ? (
                    <Typography color="error.main" mt={1}>
                        {t('mail_modal.isError')}
                    </Typography>
                ) : isSuccess ? (
                    <Typography color="success.main" mt={1}>
                        {t('mail_modal.isSuccess')}
                    </Typography>
                ) : null
            }
        />
    );
}

export default ChangeMailModal;
