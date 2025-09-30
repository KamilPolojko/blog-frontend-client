import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { CommentFormData } from '@/components/form/CommentForm';
import { useTranslation } from 'react-i18next';

interface ReplyFormProps {
    commentId: string;
    authorUsername: string;
    onSubmit: (content: string, parentId: string) => void;
    onCancel: () => void;
}

export const ReplyForm = ({ commentId, authorUsername, onSubmit, onCancel }: ReplyFormProps) => {
    const {t, ready} = useTranslation();
    const { register, handleSubmit, reset } = useForm<CommentFormData>();

    const onSubmitForm = (data: CommentFormData) => {
        onSubmit(data.content, commentId);
        reset();
    };

    if(!ready) return null;
    return (
        <Box ml={2} mt={1} mb={2}>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <TextField
                    {...register('content', {
                        required: t('form_fields.reply_content.errors.required'),
                        minLength: { value: 1, message: t('form_fields.reply_content.errors.minLength.message'), }
                    })}
                    multiline
                    minRows={1}
                    maxRows={6}
                    fullWidth
                    placeholder={t("form_fields.reply_content.placeholder", { authorUsername: authorUsername })}
                    sx={{ mb: 1 }}
                />
                <Stack direction="row" gap={1}>
                    <Button type="submit" size="small" variant="contained">
                        {t('button.add_reply')}
                    </Button>
                    <Button size="small" variant="outlined" onClick={onCancel}>
                        {t('button.cancel')}
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};