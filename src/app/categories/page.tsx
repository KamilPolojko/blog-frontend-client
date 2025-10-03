"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import ArticleCard from "@/components/articles/ArticleCard";
import Box from "@mui/material/Box";
import { categories } from "@/constants/categories";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { CustomCircularProgress } from "@/styles/CustomCircuralProgress";
import { articleType } from "@/types/ArticleTypes";
import { useInfiniteArticles } from "@/hooks/articles/useInfiniteArticles";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";

export default function Categories() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const theme = useTheme();
    const { t, ready } = useTranslation();
    const searchParams = useSearchParams();

    useEffect(() => {
        const categoryFromUrl = searchParams.get("category");
        if (categoryFromUrl) setSelectedCategories([decodeURIComponent(categoryFromUrl)]);
    }, [searchParams]);

    const { data: articles, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
        useInfiniteArticles(10, 'createdAt', 'DESC', selectedCategories);

    const allArticles = useMemo(() =>
            articles?.pages.flatMap(page => page.articles) ?? []
        , [articles]);


    console.log(allArticles.map((a, i) => `${i}: ${a.id}`));


    if (!ready) return null;

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.default,
                width: "100%",
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 6,
            }}
        >
            <Typography
                variant="h6"
                component="h2"
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "3.5rem",
                    lineHeight: 1.2,
                    pt:3,
                }}
            >
                {t('categories.title')}
            </Typography>

            <Autocomplete
    multiple
    freeSolo
    options={categories}
    value={selectedCategories}
    onChange={(_event, newValue) => setSelectedCategories(newValue)}
    renderTags={(value, getTagProps) => (
        <>
            {value.map((option: string, index: number) => (
                <Chip 
                    key={option} 
                    variant="outlined" 
                    label={option} 
                    sx={{ mr: 0.5 }} 
                    {...getTagProps({ index })}
                />
            ))}
        </>
    )}
    renderInput={(params) => (
        <TextField
            {...params}
            variant="outlined"
            label="Wybierz kategorie / dodaj tag"
            placeholder="np. Technology, AI..."
        />
    )}
    sx={{
        width: { xs: 200, sm: 400, md: 600 },
        mx: "auto",
    }}
/>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 3,
                    justifyContent: "center",
                    alignItems: "flex-start",
                }}
            >
                {allArticles?.map((article: articleType) => (
                    <Box
                        key={article.id}
                        sx={{ flex: "0 0 310px", maxWidth: "100%", display: "flex", mb: 4 }}
                    >
                        <ArticleCard article={article} invalidateArticleList />
                    </Box>
                ))}

                {(isLoading || isFetchingNextPage) && (
                    <CustomCircularProgress size={24} />
                )}

                {allArticles?.length === 0 && !isLoading && (
                    <Box sx={{ textAlign: "center", py: 4 }}>
                        <Typography variant="h6" color="text.secondary">
                            {t('categories.articles_not_found')}
                        </Typography>
                    </Box>
                )}
            </Box>

            {hasNextPage && (
                <Box sx={{ textAlign: "center", mt: 4, mb: 4 }}>
                    <Button
                        variant="contained"
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? t('button.loading') : t('button.load_more')}
                    </Button>
                </Box>
            )}
        </Box>
    );
}
