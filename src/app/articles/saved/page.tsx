"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArticleCard from "@/components/articles/ArticleCard";
import React from "react";
import { useMe } from "@/hooks/auth/useMe";
import { CustomCircularProgress } from "@/styles/CustomCircuralProgress";
import { useGetSavedArticles } from '@/hooks/savedArticles/useGetSavedArticles';
import { articleType } from '@/types/ArticleTypes';
import { useTranslation } from 'react-i18next';

export default function MinePage() {
    const { t, ready } = useTranslation();
    const { data: user } = useMe();

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetSavedArticles(user?.id, 8);


    if (isLoading) {
        return <CustomCircularProgress size={24} />;
    }

    if (!user) {
        return <div>{t('saved_articles.have_to_log_in')}</div>;
    }

    if (isError) {
        return <div>{t('saved_articles.isError')}</div>;
    }

    if (!ready) return null;

    const articles = data?.pages.flatMap((page) => page.articles) || [];

    console.log("articles", articles);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 3,
                gap: 3,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 3,
                    justifyContent: "center",
                    alignItems: "stretch",
                    width: "100%",
                }}
            >
                {articles.map((article: articleType) => (
                    <Box
                        key={article.id}
                        sx={{
                            flex: "0 0 310px",
                            maxWidth: "100%",
                            display: "flex",
                        }}
                    >
                        <ArticleCard
                            article={article}
                            invalidateSingleArticle={false}
                            invalidateArticleList={false}
                            optimistic={true}
                        />
                    </Box>
                ))}
            </Box>

            {hasNextPage && (
                <Button
                    variant="contained"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    sx={{ mt: 2 }}
                >
                    {isFetchingNextPage ? t('button.loading') : t('button.load_more')}
                </Button>
            )}
        </Box>
    );
}
