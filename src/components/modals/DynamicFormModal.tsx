import React, { useEffect } from 'react';
import { Modal, Fade, Box, Typography, IconButton, Button, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DynamicFormModalStatelessProps, FieldConfig } from '@/types/dynamicFormTypes';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import FormRichTextField from '@/components/form/RichTextField/FormRichTextField';
import { TextField } from '@mui/material';

const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 360,
    borderRadius: 2,
    p: 4,
    boxShadow: 24,
    outline: 'none',
    maxHeight: '90vh',
    overflowY: 'auto',
};

export default function DynamicFormModal({
                                             open,
                                             onClose,
                                             title,
                                             fields,
                                             onSubmit,
                                             submitButtonText,
                                             extraComponents,
                                             form,
                                         }: DynamicFormModalStatelessProps) {
    const { t } = useTranslation();
    const theme = useTheme();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
        control,
    } = form;

    useEffect(() => {
        if (!open) reset();
    }, [open, reset]);

    const passwordValue = watch('password');

    const enhanceValidation = (field: FieldConfig) => {
        if (field.name === 'confirmPassword') {
            return {
                ...field.validation,
                validate: (value: string) =>
                    value === passwordValue || t("password_modal.errors.mismatch"),
            };
        }
        return field.validation;
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            slotProps={{
                backdrop: { sx: { backgroundColor: 'rgba(0,0,0,0.5)' } },
            }}
        >
            <Fade in={open}>
                <Box sx={{ ...modalStyle, bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: theme.palette.text.primary,
                            '&:hover': { color: theme.palette.primary.main },
                        }}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography id="modal-title" variant="h6" sx={{ mb: 2 }}>
                        {title}
                    </Typography>

                    <Stack component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {fields.map(({ name, label, type = 'text', placeholder, validation }, idx) => {
                            if (type === 'richtext') {
                                return (
                                    <FormRichTextField
                                        key={idx}
                                        name={name}
                                        control={control}
                                        label={label}
                                        placeholder={placeholder!}
                                        rules={enhanceValidation({ name, label, validation })}
                                    />
                                );
                            }

                            return (
                                <TextField
                                    key={idx}
                                    id={name}
                                    type={type}
                                    label={label}
                                    placeholder={placeholder}
                                    {...register(name, enhanceValidation({ name, label, validation }))}
                                    error={!!errors[name]}
                                    helperText={errors[name]?.message?.toString()}
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 2,
                                            "&:hover fieldset": {
                                                borderColor: "primary.main",
                                            },
                                        },
                                    }}
                                />
                            );
                        })}

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                width: '100%',
                                borderRadius: '999px',
                                textTransform: 'none',
                                backgroundColor: theme.palette.text.primary,
                                color: theme.palette.background.default,
                                '&:hover': {
                                    backgroundColor: theme.palette.background.default,
                                    color: theme.palette.text.primary,
                                },
                            }}
                        >
                            {submitButtonText}
                        </Button>

                        {extraComponents}
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    );
}
