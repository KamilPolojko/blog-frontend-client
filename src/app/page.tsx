"use client";

import { Box, Typography, Avatar, Chip, useTheme } from '@mui/material';
import Image from "next/image";
import Link from "next/link";
import { useGetArticles } from '@/hooks/articles/useGetArticles';
import { useGetClients } from '@/hooks/clients/useGetClients';
import { useGetPopularArticles } from '@/hooks/articles/useGetPopularArticles';
import ArticleHomePageCard from '@/components/articles/ArticleHomePageCard';
import { categories } from '@/constants/categories';
import { ROUTES } from '@/routes/routes';
import React from 'react';
import { CustomCircularProgress } from '@/styles/CustomCircuralProgress';
import { useTranslation } from 'react-i18next';


export default function HomePage() {
    const theme = useTheme();
    const {t, ready} = useTranslation();
    const { data: articles, isLoading, isError } = useGetArticles(0, 3, "createdAt", "DESC");
    const { data: popularArticles, isLoading: isLoadingPopularArticles, isError: isErrorPopularArticles } = useGetPopularArticles(0, 4);
    const { data: clients, isLoading: isLoadingClients, isError: isClientsError } = useGetClients();

    if(!ready) return null;
    return (
        <Box sx={{ width: "100%", bgcolor: "background.paper"}}>
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: { xs: "400px", md: "600px" },
                    overflow: "hidden",
                }}
            >
                <Image
                    src="/notabene_banner.jpg"
                    alt="Hero"
                    fill
                    priority
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        top: { xs: "10%", md: "15%" },
                        left: { xs: "5%", md: "10%" },
                        textAlign: "left",
                        maxWidth: { xs: "90%", md: "40%" },
                    }}
                >
                    <Typography variant="h3" fontWeight="bold" gutterBottom color={theme.palette.primary.dark}>
                        {t('homepage.title')}
                    </Typography>
                    <Typography variant="subtitle1" color={theme.palette.primary.dark}>
                        {t('homepage.subtitle')}
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    px: { xs: 2, md: 6 },
                    py: 6,
                }}
            >
                <Typography variant="h5" fontWeight="bold" mb={3}>
                    {t('homepage.top_authors')}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        overflowX: { xs: "auto", md: "visible" },
                        pb: { xs: 1, md: 0 },
                    }}
                >
                    {clients?.map((client) => (
                        <Box
                            key={client.id}
                            sx={{ textAlign: "center", minWidth: { xs: 100, md: "auto" } }}
                        >
                            <Link href={ROUTES.PROFILE(client.id)}>
                                <Avatar
                                    src={client.profile?.linkIImage || "/avatars/default.png"}
                                    sx={{ width: 72, height: 72, mx: "auto" }}
                                />
                            </Link>
                            <Typography variant="body2" mt={1}>
                                {client.profile?.firstName
                                    ? `${client.profile.firstName} ${client.profile.lastName}`
                                    : client.username}
                            </Typography>
                        </Box>
                    ))}
                    {isLoadingClients && <CustomCircularProgress size={24} />}
                    {isClientsError && <Typography color="error">{t('homepage.is_clients_error')}</Typography>}
                </Box>
            </Box>

            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    px: { xs: 2, md: 6 },
                    py: 6,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: 1,
                }}
            >
                <Typography variant="h5" fontWeight="bold" mb={3}>
                    {t('homepage.latest_articles')}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 3,
                        justifyContent: { xs: "center", sm: "flex-start" }
                    }}
                >
                    {articles?.articles
                        ?.map((article) => (
                            <Box
                                key={article.id}
                                sx={{
                                    flex: {
                                        xs: "1 1 100%",
                                        sm: "1 1 calc(50% - 12px)",
                                        md: "1 1 calc(33.333% - 16px)"
                                    },
                                    minWidth: { xs: "280px", sm: "300px" },
                                    maxWidth: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(33.333% - 16px)" }
                                }}
                            >
                                <ArticleHomePageCard article={article} />
                            </Box>
                        ))}
                    {isLoading && <CustomCircularProgress size={24} />}
                    {isError && <Typography color="error">{t('homepage.is_articles_error')}</Typography>}
                </Box>
            </Box>

            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    px: { xs: 2, md: 6 },
                    py: 6,
                }}
            >
                <Typography variant="h5" fontWeight="bold" mb={3}>
                    {t('homepage.explore_topics')}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {categories.map((c) => (
                        <Link
                            key={c}
                            href={ROUTES.SEARCH_CATEGORY(encodeURIComponent(c))}
                            passHref
                            style={{ textDecoration: 'none' }}
                        >
                            <Chip
                                label={c}
                                clickable
                                sx={{
                                    cursor: "pointer",
                                    fontWeight: 500,
                                    "&:hover": { bgcolor: "primary.main", color: "white" },
                                }}
                            />
                        </Link>
                    ))}
                </Box>
            </Box>

            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    px: { xs: 2, md: 6 },
                    py: 6,
                }}
            >
                <Typography variant="h5" fontWeight="bold" mb={3}>
                    {t('homepage.popular_articles')}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 3,
                        justifyContent: { xs: "center", sm: "flex-start" }
                    }}
                >
                    {popularArticles?.articles?.map((article) => (
                        <Box
                            key={article.id}
                            sx={{
                                flex: {
                                    xs: "1 1 100%",
                                    sm: "1 1 calc(50% - 12px)",
                                    md: "1 1 calc(50% - 12px)",
                                    lg: "1 1 calc(25% - 18px)"
                                },
                                minWidth: { xs: "280px", sm: "300px" },
                                maxWidth: {
                                    xs: "100%",
                                    sm: "calc(50% - 12px)",
                                    md: "calc(50% - 12px)",
                                    lg: "calc(25% - 18px)"
                                }
                            }}
                        >
                            <ArticleHomePageCard article={article} />
                        </Box>
                    ))}
                    {isLoadingPopularArticles && <CustomCircularProgress size={24} />}
                    {isErrorPopularArticles && <Typography color="error">{t('homepage.is_popular_articles_error')}</Typography>}
                </Box>
            </Box>
        </Box>
    );
}