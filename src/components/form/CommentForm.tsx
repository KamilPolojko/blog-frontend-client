import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import { Avatar, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLoginModal } from '@/context/LoginModalContext';
import { useMe } from '@/hooks/auth/useMe';
import { useTranslation } from 'react-i18next';

interface CommentFormProps {
    onSubmit: (content: string) => void;
    userAvatar?: string;
}

export type CommentFormData = {
    content: string;
};

export const CommentForm = ({ onSubmit, userAvatar }: CommentFormProps) => {
    const {t, ready} = useTranslation();
    const { setLoginOpen } = useLoginModal();
    const { data: user } = useMe();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentFormData>();

    const onSubmitForm = (data: CommentFormData) => {
        if (!user) {
            setLoginOpen(true);
            return;
        }

        onSubmit(data.content);
        reset();
    };

    if(!ready) return null;
    return (
        <Stack direction="row" alignItems="flex-start" gap={2} mb={2}>
            <Avatar sx={{ width: 40, height: 40 }} src={userAvatar} />
            <Box flex={1}>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <TextField
                        {...register('content', {
                            required: t('form_fields.content.errors.required'),
                            minLength: { value: 1, message: t('form_fields.content.errors.minLength.message') }
                        })}
                        multiline
                        minRows={2}
                        maxRows={8}
                        placeholder={t("form_fields.content.placeholder")}
                        variant="outlined"
                        fullWidth
                        error={!!errors.content}
                        helperText={errors.content?.message}
                        sx={{ mb: 1}}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ float: 'right' }}
                    >
                        {t('button.add_comment')}
                    </Button>
                </form>
            </Box>
        </Stack>
    );
};