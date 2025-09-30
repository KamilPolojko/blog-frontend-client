"use client";

import React from "react";
import { useMe } from "@/hooks/auth/useMe";
import { useCreateArticle } from "@/hooks/articles/useCreateArticle";
import ArticleForm, { ArticleFormData } from "@/components/form/ArticleForm";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTranslation } from 'react-i18next';

export default function CreateArticlePage() {
    const {t, ready} = useTranslation();
    const { data: client } = useMe();
    const { mutate: createArticle, isPending, isSuccess, isError } = useCreateArticle();

    const defaultValues: ArticleFormData = {
        title: "",
        content: "",
        description: "",
        categories: [],
        isActive: true,
        readingTime: 5,
        image: undefined,
        createdAt: new Date(),
    };

    const handleSubmit = (data: ArticleFormData) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("content", data.content);
        if (client) formData.append("authorId", client.id);
        formData.append("description", data.description);
        (data.categories || []).forEach((cat) => formData.append("categories", cat));
        if (data.image) formData.append("image", data.image);
        formData.append("isActive", data.isActive.toString());
        formData.append("readingTime", data.readingTime.toString());
        formData.append("createdAt", data.createdAt?.toISOString() || new Date().toISOString());

        createArticle(formData);
    };

    if(!ready) return null;
    return (
        <ArticleForm
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            isPending={isPending}
            isSuccess={isSuccess}
            isError={isError}
            submitLabel={t('button.create_article')}
        />
    );
}