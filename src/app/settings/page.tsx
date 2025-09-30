'use client';

import { Box, Typography, Button, TextField, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import React, {useEffect, useState} from 'react';
import FormField from '@/components/form/FormField';
import { useMe } from '@/hooks/auth/useMe';
import {useUpdateProfile} from "@/hooks/profile/useUpdateProfile";
import MenuItem from "@mui/material/MenuItem";
import {Gender} from "@/types/gender";
import ChangeMailModal from "@/components/modals/ChangeMailModal";
import Image from 'next/image';
import ChangePasswordModal from "@/components/modals/ChangePasswordModal";
import DropzoneUpload from "@/components/buttons/DropzoneUpload";
import { CustomCircularProgress } from '@/styles/CustomCircuralProgress';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export interface ProfileDataResponse {
    dateOfBirth: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    username: string;
    linkIImage?: string;
    image: File;
}


export default function SettingsPage() {
    const {t, ready} = useTranslation();
    const { data: client, isLoading } = useMe();
    const { mutate: updateProfile, isSuccess, isPending, isError } = useUpdateProfile();

    const [openChangeEmail, setOpenChangeEmail] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);


    const { control, handleSubmit, reset, formState, setValue } = useForm<ProfileDataResponse>({
        defaultValues: {
            firstName: '',
            lastName: '',
            gender: '',
            dateOfBirth: '',
            username: '',
            email: '',
            image: undefined,
            linkIImage: "",
        },
    });

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    useEffect(() => {
        if (client) {
            if (!formState.isDirty) {
                reset({
                    firstName: client.profile?.firstName ?? "",
                    lastName: client.profile?.lastName ?? "",
                    gender: client.profile?.gender ?? "",
                    dateOfBirth: client.profile?.dateOfBirth
                        ? client.profile.dateOfBirth.substring(0, 10)
                        : "",
                    username: client.username ?? "",
                    email: client.email ?? "",
                    linkIImage: client.profile?.linkIImage ?? "",
                    image: undefined,
                });
            }

            if (formState.defaultValues?.email !== client.email) {
                 setValue("email", client.email ?? "");
            }

            setPreviewImage(client.profile?.linkIImage || null);
        }
    }, [client, reset, setValue, formState.isDirty, formState.defaultValues?.email]);


    const onFileChange = (file: File) => {
        if (file) {
            setValue("image", file, {shouldDirty: true});
            const reader = new FileReader();
            reader.onload = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(client?.profile.linkIImage ?? null);
        }
    };

    const onSubmit = (data: ProfileDataResponse) => {

        if (openChangeEmail) {
            console.log("⚠️ Modal is open, preventing form submit");
            return;
        }

        const formData = new FormData();

        formData.append('email', data.email);
        formData.append('username', data.username);
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('gender', data.gender);

        if (data.dateOfBirth) {
            formData.append('dateOfBirth', new Date(data.dateOfBirth).toISOString());
        } else {
            formData.append('dateOfBirth', '');
        }

        if (data.image && data.image instanceof File) {
            formData.append('image', data.image);
        }

        updateProfile(formData);

    }

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <CustomCircularProgress size={24} />
            </Box>
        );
    }

    if(!ready) return null;
    return (
        <Box
            sx={{
                mx: 'auto',
                mt: 5,
                mb: 5,
                width: 360,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
                p: 4,
            }}
        >
            <Typography variant="h5" mb={2}>
                {t('settings.settings')}
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <FormField name="firstName" label={t('form_fields.name.label')} control={control}/>
                <FormField name="lastName" label={t('form_fields.surname.label')} control={control}/>
                <FormField
                    name="gender"
                    label={t('form_fields.gender.label')}
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            select
                            label={t('form_fields.gender.label')}
                            fullWidth
                        >
                            <MenuItem value={Gender.MALE}>{t('form_fields.gender.male')}</MenuItem>
                            <MenuItem value={Gender.FEMALE}>{t('form_fields.gender.female')}</MenuItem>
                            <MenuItem value={Gender.OTHER}>{t('form_fields.gender.other')}</MenuItem>
                        </TextField>
                    )}
                />
                <FormField name="dateOfBirth" label={t('form_fields.date_of_birth.label')} type="date" control={control}
                           placeholder={t('form_fields.date_of_birth.placeholder')}
                           render={({ field }) => (
                               <DatePicker
                                   {...field}
                                   label={t('form_fields.date_of_birth.label')}
                                   value={field.value ? dayjs(field.value) : null}
                                   onChange={(date: dayjs.Dayjs | null) => field.onChange(date ? date.toDate() : null)}
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
                <FormField name="username" label={t('form_fields.username.label')} control={control}/>
                <Stack spacing={0.5}>
                    <FormField name="email" label={t('form_fields.mail.email.label')} type="email" control={control} InputProps={{readOnly: true}}/>
                    <Typography
                        component="button"
                        type="button"
                        onClick={() => {
                            setOpenChangeEmail(!openChangeEmail);
                        }}
                        sx={{
                            color: 'gray',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            background: 'none',
                            border: 'none',
                            fontSize: '0.875rem',
                            textAlign: 'left',
                            p: 0,
                        }}
                    >
                        {t('button.set_new_mail')}
                    </Typography>
                    <ChangeMailModal openChangeEmail={openChangeEmail} setOpenChangeEmail={setOpenChangeEmail}/>
                </Stack>


                <Stack spacing={0.5}>
                    <FormField
                        name="password"
                        label={t('form_fields.password.password.label')}
                        type="password"
                        control={control}
                        placeholder={t('form_fields.password.password.placeholder')}
                        defaultValue="**********"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <Typography
                        component="button"
                        type="button"
                        onClick={() => {
                            setOpenChangePassword(!openChangePassword);
                        }}
                        sx={{
                            color: 'gray',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            background: 'none',
                            border: 'none',
                            fontSize: '0.875rem',
                            textAlign: 'left',
                            p: 0,
                        }}
                    >
                        {t('button.set_new_password')}
                    </Typography>
                    <ChangePasswordModal openChangePassword={openChangePassword}
                                         setOpenChangePassword={setOpenChangePassword}
                                        userId={null}/>
                </Stack>


                <Stack spacing={1} alignItems="center">
                    <Typography fontWeight={600}>{t('settings.profile_img')}</Typography>

                    {previewImage ? (
                        <Box
                            sx={{
                                position: 'relative',
                                width: 120,
                                height: 120,
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '2px solid',
                                borderColor: 'grey.300',
                            }}
                        >
                            <Image
                                src={previewImage}
                                alt="Podgląd zdjęcia"
                                fill
                                style={{
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            {t('preview.no_image')}
                        </Typography>
                    )}

                    <DropzoneUpload onFileChange={onFileChange}/>
                </Stack>


                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        mt: 2,
                        width: "100%",
                        borderRadius: "24px",
                        fontWeight: "bold",
                        bgcolor: "black",
                        color: "white",
                        py: 1.5,
                        "&:hover": {bgcolor: "gray.800"},
                    }}
                    disabled={isPending || !formState.isDirty}
                >
                    {isPending ? t('settings.isPending') : t('button.save_changes')}
                </Button>

                {isSuccess && (
                    <Typography color="success.main" mt={1}>
                        {t('settings.isSuccess')}
                    </Typography>
                )}
                {isError && (
                    <Typography color="error.main" mt={1}>
                        {t('settings.isError')}
                    </Typography>
                )}
            </Box>
        </Box>
    );
}