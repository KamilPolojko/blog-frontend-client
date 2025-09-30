import React, { memo } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

type EditFormData = { content: string };

const EditCommentFormBase = ({
                                 initialValue,
                                 onSubmit,
                                 onCancel,
                             }: {
    initialValue: string;
    onSubmit: (content: string) => void;
    onCancel: () => void;
}) => {
    const {t, ready} = useTranslation();
    const { register, handleSubmit } = useForm<EditFormData>({
        defaultValues: { content: initialValue },
    });

    if(!ready) return null;
    return (
        <Box sx={{ mb: 2 }}>
            <form onSubmit={handleSubmit((data) => onSubmit(data.content))}>
                <TextField
                    {...register("content", { required: true })}
                    multiline
                    minRows={2}
                    maxRows={8}
                    fullWidth
                    sx={{ mb: 1 }}
                    autoFocus
                />
                <Stack direction="row" gap={1}>
                    <Button type="submit" size="small" variant="contained" color="primary">
                        {t('button.save_changes')}
                    </Button>
                    <Button size="small" variant="outlined" onClick={onCancel}>
                        {t('button.cancel')}
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export const EditCommentForm = memo(EditCommentFormBase);
