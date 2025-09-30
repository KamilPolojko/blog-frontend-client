// VerifyCodeModal.tsx
import DynamicFormModal from '@/components/modals/DynamicFormModal';
import React from 'react';
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { useVerifyCode } from '@/hooks/auth/useVerifyCode';

interface VerifyCodeModalProps {
    setOpenVerifyCode: (open: boolean) => void;
    openVerifyCode: boolean;
    onVerificationSuccess: (userId: string) => void;
}

export default function VerifyCodeModal({
                                            setOpenVerifyCode,
                                            openVerifyCode,
                                            onVerificationSuccess,
                                        }: VerifyCodeModalProps) {
    const { t, ready } = useTranslation();
    const { mutate: verifyCode, isPending, isError, isSuccess } = useVerifyCode();

    const form = useForm<{ code: string }>({ defaultValues: { code: '' } });

    const handleVerifyCodeSubmit = (data: { code: string }) => {
        verifyCode(data, {
            onSuccess: (response) => {
                if (response.success && response.userId) {
                    setOpenVerifyCode(false);
                    onVerificationSuccess(response.userId);
                }
            },
        });
    };

    if (!ready) return null;

    return (
        <DynamicFormModal
            open={openVerifyCode}
            onClose={() => setOpenVerifyCode(false)}
            title={t("verify_code_modal.title")}
            form={form}
            submitButtonText={isPending ? t('verify_code_modal.isPending') : t('button.submit')}
            fields={[
                {
                    name: 'code',
                    label: t('form_fields.verification_code.label'),
                    type: 'text',
                    placeholder: t('form_fields.verification_code.placeholder'),
                    validation: {
                        required: t('form_fields.verification_code.errors.required'),
                        minLength: {
                            value: 4,
                            message: t('form_fields.verification_code.errors.minLength.message'),
                        },
                    },
                },
            ]}
            extraComponents={
                <>
                    {isSuccess && (
                        <p className="text-green-500 text-sm">
                            {t('verify_code_modal.isSuccess')}
                        </p>
                    )}
                    {isError && (
                        <p className="text-red-500 text-sm">
                            {t('verify_code_modal.isError')}
                        </p>
                    )}
                </>
            }
            onSubmit={handleVerifyCodeSubmit}
        />
    );
}
