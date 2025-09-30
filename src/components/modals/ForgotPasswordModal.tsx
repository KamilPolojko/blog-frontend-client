import DynamicFormModal from '@/components/modals/DynamicFormModal';
import React, { useState } from 'react';
import {useForm} from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { usePasswordReset } from '@/hooks/auth/usePasswordReset';
import VerifyCodeModal from '@/components/modals/VerifyCodeModal';
import ChangePasswordModal from '@/components/modals/ChangePasswordModal';

interface ForgotPasswordModalProps {
    setOpenForgot: (openForgot: boolean) => void;
    openForgot: boolean;
}

function ForgotPasswordModal({
                                 setOpenForgot,
                                 openForgot,
                             }: ForgotPasswordModalProps) {
    const {t, ready} = useTranslation();
    const { mutate: resetPassword, isPending, isError, isSuccess } = usePasswordReset();
    const form = useForm();

    const [openVerifyCode, setOpenVerifyCode] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    const handleChangePasswordSubmit = (data: any) => {
        resetPassword(data, {
            onSuccess: () => {
                setOpenForgot(false);
                setOpenVerifyCode(true);
            }
        });
    };

    const handleVerificationSuccess = (verifiedUserId: string) => {
        setUserId(verifiedUserId);
        setOpenVerifyCode(false);
        setOpenChangePassword(true);
    };

    if(!ready) return null;
    return (
        <>
            <DynamicFormModal
                open={openForgot}
                onClose={() => setOpenForgot(false)}
                title={t("forgot_password_modal.title")}
                form={form}
                submitButtonText={isPending? t('forgot_password_modal.isPending'):t('button.submit')}
                fields={[
                    {
                        name: 'email',
                        label: t('form_fields.mail.email.label'),
                        type: 'email',
                        placeholder: t('form_fields.mail.email.placeholder'),
                        validation: {
                            required: t('form_fields.mail.errors.required'),
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: t('form_fields.mail.errors.pattern.message'),
                            },
                        },
                    }
                ]}
                extraComponents={
                    <>
                        {isSuccess && (
                            <p className="text-green-500 text-sm">
                                {t('forgot_password_modal.isSuccess')}
                            </p>
                        )}
                        {isError && (
                            <p className="text-red-500 text-sm">
                                {t('forgot_password_modal.isError')}
                            </p>
                        )}
                    </>
                }
                onSubmit={handleChangePasswordSubmit}
            />

            <VerifyCodeModal
                openVerifyCode={openVerifyCode}
                setOpenVerifyCode={setOpenVerifyCode}
                onVerificationSuccess={handleVerificationSuccess}
            />

            <ChangePasswordModal
                openChangePassword={openChangePassword}
                setOpenChangePassword={setOpenChangePassword}
                userId={userId}
            />
        </>
    );
}

export default ForgotPasswordModal;