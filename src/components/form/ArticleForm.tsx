"use client";

import React, { useEffect, useState } from 'react';
import { Box, Button, FormControlLabel, Switch, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import FormField from "@/components/form/FormField";
import FormRichTextField from "@/components/form/RichTextField/FormRichTextField";
import { Autocomplete } from "@mui/material";
import DropzoneUpload from "@/components/buttons/DropzoneUpload";
import ArticleImagePreview from "@/components/articles/ArticleImagePreview";
import { categories as allCategories } from "@/constants/categories";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export interface ArticleFormData {
    title: string;
    content: string;
    description: string;
    categories: string[];
    isActive: boolean;
    readingTime: number;
    image?: File | undefined;
    createdAt: Date;
}

interface ArticleFormProps {
    defaultValues: ArticleFormData;
    onSubmit: (data: ArticleFormData) => void;
    isPending?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
    submitLabel: string;
    previewIImage?: string | null;
}

export default function ArticleForm({
                                        defaultValues,
                                        onSubmit,
                                        isPending,
                                        isSuccess,
                                        isError,
                                        submitLabel,
                                        previewIImage,
                                    }: ArticleFormProps) {
    const {t,ready} = useTranslation();
    const { control, handleSubmit, reset, watch, formState } = useForm<ArticleFormData>({
        defaultValues,
    });

    const [previewImage, setPreviewImage] = useState<string | null>(previewIImage ?? null);
    const isActiveValue = watch("isActive");

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    if(!ready) return null;
    return (
        <Box sx={{ mx: "auto", mt: 5, mb: 5, maxWidth: 900, bgcolor: "background.paper", borderRadius: 2, boxShadow: 3, p: 4 }}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" autoComplete="off">
                <FormField name="title" label={t('form_fields.title.label')} control={control} rules={{ required: t('form_fields.title.errors.required'), maxLength: { value: 100, message: t('form_fields.title.errors.maxLength.message') } }} />

                <FormRichTextField name="content" control={control} label={t('form_fields.article_content.label')} placeholder={t('form_fields.article_content.placeholder')} rules={{ required: t('form_fields.article_content.errors.required') }} />

                <FormRichTextField name="description" control={control} label={t('form_fields.description.label')} placeholder={t('form_fields.description.placeholder')} rules={{ required: t('form_fields.description.errors.required') }} />

                <FormField
                    name="categories"
                    label={t('form_fields.categories.label')}
                    control={control}
                    rules={{ required: t('form_fields.categories.errors.required') }}
                    render={({ field, fieldState }) => (
                        <Autocomplete
                            {...field}
                            multiple
                            freeSolo
                            options={allCategories}
                            value={field.value || []}
                            onChange={(_, newValue) => field.onChange(newValue)}
                            renderInput={(params) => <TextField {...params} label={t('form_fields.categories.label')} placeholder={t('form_fields.categories.placeholder')} error={!!fieldState.error} helperText={fieldState.error?.message} />}
                        />
                    )}
                />


                <Controller
                    name="image"
                    control={control}
                    rules={{
                        required: !previewImage ? t('form_fields.preview_image.errors.required') : false,
                    }}
                    render={({ field, fieldState }) => (
                        <div className="flex flex-col gap-2 items-center w-full">
                            <Typography fontWeight={600}>{t('form_fields.preview_image.typography')}</Typography>
                            <ArticleImagePreview
                                previewImage={previewImage}
                                setPreviewImage={setPreviewImage}
                                fieldState={fieldState}
                            />

                            <DropzoneUpload
                                onFileChange={(file) => {
                                    field.onChange(file);
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = () => setPreviewImage(reader.result as string);
                                        reader.readAsDataURL(file);
                                    } else {
                                        setPreviewImage(null);
                                    }
                                }}
                                sx={{
                                    width: "100%",
                                    maxWidth: 800,
                                    height: 300,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mt: 2,
                                }}
                            />
                        </div>
                    )}
                />


                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3, mt: 2, p: 3, borderRadius: 2, border: "1px solid", borderColor: "grey.200" }}>
                    <Box sx={{ flex: 1 }}>
                        <FormField
                            name="isActive"
                            label={t('form_fields.isActive.label')}
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={field.value}
                                            onChange={(e) => field.onChange(e.target.checked)}
                                            size="medium"
                                            sx={{
                                                "& .MuiSwitch-switchBase.Mui-checked": { color: "success.main" },
                                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "success.main" },
                                            }}
                                        />
                                    }
                                    label={
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {isActiveValue ? t('status.active') : t('status.inactive')}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                {isActiveValue ? t('form_fields.isActive.active_value') : t('form_fields.isActive.inactive_value')}
                                            </Typography>
                                        </Box>
                                    }
                                    labelPlacement="end"
                                />
                            )}
                        />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <FormField
                            name="readingTime"
                            label={t('form_fields.reading_time.label')}
                            control={control}
                            rules={{ required: t('form_fields.reading_time.errors.required'), min: { value: 1, message: t('form_fields.reading_time.errors.min') }, max: { value: 300, message: t('form_fields.reading_time.errors.max') } }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label={t('form_fields.reading_time.second_label')}
                                    type="number"
                                    fullWidth
                                    slotProps={{ htmlInput: { min: 1, max: 300, step: 1 }, inputLabel: { shrink: true } }}
                                    helperText={fieldState.error?.message || t('form_fields.reading_time.helper_text')}
                                    error={!!fieldState.error}
                                    sx={{ "& .MuiInputLabel-root": { fontWeight: 600 } }}
                                />
                            )}
                        />
                    </Box>
                </Box>

                <Controller
                    name="createdAt"
                    control={control}
                    defaultValue={defaultValues.createdAt || new Date()}
                    render={({ field }) => (
                        <DatePicker
                            {...field}
                            label={t('form_fields.created_at.label')}
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(date) => field.onChange(date ? date.toDate() : null)}
                            enableAccessibleFieldDOMStructure={false}
                            slots={{ textField: TextField }}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    sx: {
                                        mt: 2,
                                        "& .MuiInputBase-root": { borderRadius: 2 },
                                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "grey.300" },
                                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.dark" },
                                        "& .MuiInputLabel-root": { color: "text.primary" },
                                    },
                                },
                            }}
                        />
                    )}
                />


                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2, width: "100%", borderRadius: "24px", fontWeight: "bold", bgcolor: "black", color: "white", py: 1.5, "&:hover": { bgcolor: "gray.800" } }}
                    disabled={isPending || !formState.isDirty}
                >
                    {isPending ? t('article_form.isPending') : submitLabel}
                </Button>

                {isSuccess && (
                    <Typography color="success.main" mt={1}>
                        {t('article_form.isSuccess')}
                    </Typography>
                )}
                {isError && (
                    <Typography color="error.main" mt={1}>
                        {t('article_form.isError')}
                    </Typography>
                )}
            </form>
        </Box>
    );
}
