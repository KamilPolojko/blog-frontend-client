"use client";

import {
    Box,
    Typography,
    Avatar,
    Chip,
    Button,
    Paper,
    Divider,
} from "@mui/material";
import {
    Person,
    Email,
    Cake,
    WorkspacePremium,
} from "@mui/icons-material";
import { useParams } from "next/navigation";
import { useGetClient } from "@/hooks/clients/useGetClient";
import { useMe } from "@/hooks/auth/useMe";
import { useGetArticlesCreatedByClient } from "@/hooks/articles/useGetArticlesCreatedByClient";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { ROUTES } from "@/routes/routes";
import { CustomCircularProgress } from "@/styles/CustomCircuralProgress";
import ArticleHomePageCard from "@/components/articles/ArticleHomePageCard";
import { articleType } from "@/types/ArticleTypes";
import { ReactNode } from 'react';

const ErrorState = ({ title, message }: { title: string; message: string }) => (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "50vh", gap: 2 }}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1" color="text.secondary">{message}</Typography>
    </Box>
);

const ProfileInfoRow = ({ icon, label, value }: { icon: ReactNode; label: string; value: string }) => (
    <>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {icon}
            <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{label}</Typography>
                <Typography variant="body1" fontWeight="medium">{value}</Typography>
            </Box>
        </Box>
        <Divider sx={{ opacity: 0.3 }} />
    </>
);

const ArticlesSection = ({ articles, isOwnProfile, t }: { articles: articleType[] | undefined; isOwnProfile: boolean; t: any }) => (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, border: "1px solid rgba(0,0,0,0.05)", minHeight: "600px" }}>
        <Typography variant="h5" fontWeight="bold" mb={3} sx={{ color: "#764ba2", fontSize: "1.5rem" }}>
            {t("client_profile.user_articles", { length: articles?.length || 0 })}
        </Typography>

        {articles && articles.length > 0 ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, "@media (min-width: 1200px)": { display: "grid", gridTemplateColumns: "1fr 1fr" } }}>
                {articles.map((article) => <ArticleHomePageCard key={article.id} article={article} />)}
            </Box>
        ) : (
            <Box sx={{ textAlign: "center", py: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <WorkspacePremium sx={{ fontSize: 50, color: "grey.400", mb: 2 }} />
                <Typography variant="h6" sx={{ color: "#333", fontWeight: 600 }}>{t("article.errors.not_found")}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {isOwnProfile ? t("client_profile.is_own_profile.true") : t("client_profile.is_own_profile.false")}
                </Typography>
            </Box>
        )}
    </Paper>
);

const ProfileHeader = ({ user, articlesCount, t }: { user: any; articlesCount: number; t: any }) => (
    <Box sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", py: { xs: 4, md: 8 }, position: "relative", overflow: "hidden" }}>
        <Box sx={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'4\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <Box sx={{ maxWidth: "1400px", mx: "auto", px: { xs: 2, md: 6 }, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", gap: 4, position: "relative", zIndex: 1 }}>
            <Avatar src={user.profile?.linkIImage || "/avatars/default.png"} sx={{ width: { xs: 120, md: 150 }, height: { xs: 120, md: 150 }, border: "4px solid rgba(255,255,255,0.3)", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }} />
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
                    {user.profile?.firstName && user.profile?.lastName ? `${user.profile.firstName} ${user.profile.lastName}` : user.username}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>@{user.username}</Typography>
                <Chip label={`${articlesCount} ${t("client_profile.articles_count")}`} sx={{ fontWeight: "bold", backdropFilter: "blur(10px)" }} />
            </Box>
        </Box>
    </Box>
);

export default function UserProfilePage() {
    const { t, ready } = useTranslation();
    const { id: userId } = useParams<{ id: string }>();
    const { data: user, isLoading, isError } = useGetClient(userId);
    const { data: currentUser } = useMe();

    // Pobierz wszystkie artykuły bez paginacji (max 100)
    const { data: articlesData, isLoading: isArticlesLoading } = useGetArticlesCreatedByClient({
        clientId: userId,
        limit: 100,
        sortBy: 'createdAt',
        sortOrder: 'desc'
    });

    const articles = articlesData?.data;
    const articlesCount = articlesData?.pagination?.total || 0;
    const isOwnProfile = currentUser?.id === userId;

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
        } catch {
            return t("client_profile.not_specified_error");
        }
    };

    const getGenderDisplay = (gender: string) => ({
        male: t("form_fields.gender.male"),
        female: t("form_fields.gender.female"),
        other: t("form_fields.gender.other"),
    }[gender] || t("client_profile.not_specified_error"));

    if (isLoading){
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                <CustomCircularProgress size={24} />
            </Box>
        )
    }
    if (isError || !user) return <ErrorState title={t("client_profile.profile_not_found")} message={t("client_profile.user_not_exist")} />;
    if (!ready) return null;

    return (
        <Box sx={{ width: "100%", minHeight: "100vh" }}>
            <ProfileHeader user={user} articlesCount={articlesCount} t={t} />
            <Box sx={{ maxWidth: "1400px", mx: "auto", px: { xs: 2, md: 6 }, py: 6 }}>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
                    {/* Left column */}
                    <Box sx={{ flex: { xs: 1, md: "0 0 400px" } }}>
                        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, border: "1px solid rgba(0,0,0,0.05)" }}>
                            <Typography variant="h5" fontWeight="bold" mb={3} sx={{ color: "#764ba2", fontSize: "1.5rem" }}>
                                {t("client_profile.profile_information")}
                            </Typography>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                                <ProfileInfoRow icon={<Person sx={{ color: "#764ba2", fontSize: 28 }} />} label={t("client_profile.name_surname")} value={user.profile?.firstName && user.profile?.lastName ? `${user.profile.firstName} ${user.profile.lastName}` : t("client_profile.not_specified_error")} />
                                <ProfileInfoRow icon={<Email sx={{ color: "#764ba2", fontSize: 28 }} />} label={t("form_fields.mail.email.placeholder")} value={isOwnProfile ? user.email : t("client_profile.private")} />
                                <ProfileInfoRow icon={<Person sx={{ color: "#764ba2", fontSize: 28 }} />} label={t("form_fields.gender.label")} value={user.profile?.gender ? getGenderDisplay(user.profile.gender) : t("client_profile.not_specified_error")} />
                                <ProfileInfoRow icon={<Cake sx={{ color: "#764ba2", fontSize: 28 }} />} label={t("form_fields.date_of_birth.label")} value={user.profile?.dateOfBirth ? formatDate(user.profile.dateOfBirth) : t("client_profile.not_specified_error")} />
                                <ProfileInfoRow icon={<WorkspacePremium sx={{ color: "#764ba2", fontSize: 28 }} />} label={t("client_profile.number_of_articles")} value={`${articlesCount}`} />
                            </Box>

                            {isOwnProfile && (
                                <Link href={ROUTES.USER_PROFILE.SETTINGS}>
                                    <Button variant="contained" fullWidth sx={{ mt: 3, py: 1.5, borderRadius: 2, background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)", boxShadow: "0 3px 15px rgba(102, 126, 234, 0.4)", "&:hover": { transform: "translateY(-2px)", boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)" }, transition: "all 0.3s ease" }}>
                                        {t("button.edit_profile")}
                                    </Button>
                                </Link>
                            )}
                        </Paper>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        {isArticlesLoading ? (
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                                <CustomCircularProgress size={24} />
                            </Box>
                        ) : (
                            <ArticlesSection articles={articles} isOwnProfile={isOwnProfile} t={t} />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}