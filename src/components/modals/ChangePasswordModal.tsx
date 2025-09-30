import DynamicFormModal from '@/components/modals/DynamicFormModal';
import React from 'react';
import {useForm} from "react-hook-form";
import {Typography} from "@mui/material";
import {useMe} from "@/hooks/auth/useMe";
import {useChangePassword} from "@/hooks/profile/useChangePassword";
import { useTranslation } from 'react-i18next';

export interface ChangePasswordResponseType {
    newPassword: string;
    repeatNewPassword: string;
}

interface ChangePasswordModalProps {
    setOpenChangePassword: (openForgot: boolean) => void;
    openChangePassword: boolean;
    userId: string | null;
}

function ChangePasswordModal({
    setOpenChangePassword,
    openChangePassword,
    userId,
}: ChangePasswordModalProps) {
    const { t, ready } = useTranslation();
    const { data: client } = useMe();
    const form = useForm<ChangePasswordResponseType>();
    const { mutate: changePassword, isSuccess, isError, reset } = useChangePassword();

    const onSubmit = (data: ChangePasswordResponseType) => {

        const formData = new FormData();

        if(userId !== null){
            formData.append('userId', userId);
        }
        else {
            if(client) formData.append('userId', client.id);
        }

        formData.append('newPassword', data.newPassword);
        formData.append('repeatNewPassword', data.repeatNewPassword);

        changePassword(formData);
    }

    if (!ready) return null;
    return (
        <DynamicFormModal
            open={openChangePassword}
            onClose={() => {
                setOpenChangePassword(false);
                reset();
            }}
            title={t('password_modal.title')}
            form={form}
            submitButtonText={t('button.submit')}
            fields={[
                {
                    name: 'newPassword',
                    label: t('form_fields.password.newPassword.label'),
                    type: 'password',
                    placeholder: t('form_fields.password.newPassword.placeholder'),
                    validation: {
                        required: t('form_fields.password.errors.required'),
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/,
                            message: t('form_fields.password.errors.pattern.message')
                        },
                    },
                },
                {
                    name: 'repeatNewPassword',
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
            onSubmit={form.handleSubmit((data) => {
                onSubmit(data);
                form.reset();
            })}
            extraComponents={
                isError ? (
                    <Typography color="error.main" mt={1}>
                        {t('password_modal.isError')}
                    </Typography>
                ) : isSuccess ? (
                    <Typography color="success.main" mt={1}>
                        {t('password_modal.isSuccess')}
                    </Typography>
                ) : null
            }
        />
    );
}

export default ChangePasswordModal;
