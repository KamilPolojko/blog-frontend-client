"use client";

import React, { useEffect, useState } from "react";
import { Typography, Box } from '@mui/material';
import { useParams } from "next/navigation";
import { useGetArticleById } from "@/hooks/articles/useGetArticle";
import { useMe } from "@/hooks/auth/useMe";
import { useUpdateArticle } from "@/hooks/articles/useUpdateArticle";
import ArticleForm  from "@/components/form/ArticleForm";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { CustomCircularProgress } from '@/styles/CustomCircuralProgress';
import { useTranslation } from 'react-i18next';

export interface ArticleDataResponse {
    title: string;
    content: string;
    description: string;
    categories: string[];
    isActive: boolean;
    readingTime: number;
    image?: File | undefined;
    createdAt: Date;
}

export default function EditArticlePage() {
    const {t, ready} = useTranslation();
    const { id } = useParams<{ id: string }>();
    const { data: article, isLoading, isError } = useGetArticleById(id);
    const { data: client } = useMe();
    const { mutate: updateArticle, isPending, isSuccess, isError: isArticleError } = useUpdateArticle();

    const [initialValues, setInitialValues] = useState<ArticleDataResponse | null>(null);

    useEffect(() => {
        if (article) {
            setInitialValues({
                title: article.title,
                content: article.content,
                description: article.description,
                categories: Array.isArray(article.categories) ? article.categories : [article.categories],
                isActive: article.isActive,
                readingTime: article.readingTime,
                createdAt: article.createdAt ? new Date(article.createdAt) : new Date(),
            });
        }
    }, [article]);

    const handleSubmit = (data: ArticleDataResponse) => {
        if (!article || !client) return;

        const formData = new FormData();
        formData.append("articleId", id);
        formData.append("title", data.title);
        formData.append("content", data.content);
        formData.append("description", data.description);
        formData.append("authorId", client.id);
        data.categories.forEach((cat) => formData.append("categories", cat));
        if (data.image) formData.append("image", data.image);
        formData.append("isActive", data.isActive.toString());
        formData.append("readingTime", data.readingTime.toString());
        formData.append("createdAt", data.createdAt?.toISOString());
        console.log("DATA", data);
        console.log('=== FORM DATA ENTRIES ===');
        for (let [key, value] of formData.entries()) {
            console.log(key, ':', value);
        }
        updateArticle(formData);
    };

    if (isLoading) return <CustomCircularProgress size={24} />;
    if (isError || !initialValues) return <Typography color="error">{t('article.errors.load_error')}</Typography>;

    if(!ready) return null;
    return (
        <Box sx={{ mx: "auto", mt: 5, mb: 5, maxWidth: 900 }}>
            <Typography variant="h5" mb={2}>{t('article.edit_article')}</Typography>
            <ArticleForm
                defaultValues={initialValues}
                onSubmit={handleSubmit}
                isPending={isPending}
                isSuccess={isSuccess}
                isError={isArticleError}
                previewIImage={article?.linkIImage}
                submitLabel={t('button.submit_article')}
            />
        </Box>
    );
}