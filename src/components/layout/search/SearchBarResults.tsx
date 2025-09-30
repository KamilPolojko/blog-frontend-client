import React from "react";
import {
    List,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    Box,
    Chip,
    Typography,
} from "@mui/material";
import { Person, Article, Tag } from "@mui/icons-material";
import Link from "next/link";
import { ROUTES } from "@/routes/routes";
import { SearchResult } from '@/types/SearchResultTypes';
import { CategoryHeader, StyledListItem } from '@/styles/SearchBar';
import { useTranslation } from 'react-i18next';

interface Props {
    groupedResults: Record<"user" | "article" | "tag", SearchResult[]>;
    onResultClick: (result: SearchResult) => void;
}

export const SearchBarResults = ({ groupedResults, onResultClick }: Props) => {
    const {t, ready} = useTranslation();

    if(!ready) return null;
    return (
        <List disablePadding>
            {groupedResults.user.length > 0 && (
                <>
                    <CategoryHeader variant="body2">{t('search_bar_results.users')}</CategoryHeader>
                    {groupedResults.user.map((result) => (
                        <Link
                            href={ROUTES.PROFILE(result.id)}
                            key={result.id}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <StyledListItem onClick={() => onResultClick(result)}>
                                <ListItemAvatar>
                                    <Avatar src={result.avatar} sx={{ width: 32, height: 32 }}>
                                        <Person />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Typography fontSize="0.95rem">{result.title}</Typography>}
                                    secondary={<Typography fontSize="0.8rem">{result.subtitle}</Typography>}
                                />
                            </StyledListItem>
                        </Link>
                    ))}
                    {(groupedResults.article.length > 0 || groupedResults.tag.length > 0) && <Divider />}
                </>
            )}

            {groupedResults.article.length > 0 && (
                <>
                    <CategoryHeader variant="body2">{t('search_bar_results.articles')}</CategoryHeader>
                    {groupedResults.article.map((result) => (
                        <Link
                            href={ROUTES.ARTICLE(result.id)}
                            key={result.id}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <StyledListItem onClick={() => onResultClick(result)}>
                                <ListItemAvatar>
                                    <Avatar sx={{ backgroundColor: "#1976d2", width: 32, height: 32 }}>
                                        <Article />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Typography fontSize="0.95rem">{result.title}</Typography>}
                                    secondary={
                                        <Typography
                                            fontSize="0.8rem"
                                            sx={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                display: "-webkit-box",
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: "vertical",
                                            }}
                                        >
                                            {result.subtitle}
                                        </Typography>
                                    }
                                />
                                {result.data?.categories && (
                                    <Box ml={1}>
                                        {result.data.categories.slice(0, 2).map((category: string) => (
                                            <Chip
                                                key={category}
                                                label={category}
                                                size="small"
                                                variant="outlined"
                                                sx={{ mr: 0.5, fontSize: "0.7rem", height: "20px" }}
                                            />
                                        ))}
                                    </Box>
                                )}
                            </StyledListItem>
                        </Link>
                    ))}
                    {groupedResults.tag.length > 0 && <Divider />}
                </>
            )}

            {groupedResults.tag.length > 0 && (
                <>
                    <CategoryHeader variant="body2">{t('search_bar_results.tags')}</CategoryHeader>
                    {groupedResults.tag.map((result) => (
                        <Link
                            href={ROUTES.SEARCH_CATEGORY(result.data.tag)}
                            key={result.id}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <StyledListItem onClick={() => onResultClick(result)}>
                                <ListItemAvatar>
                                    <Avatar sx={{ backgroundColor: "#ff9800", width: 32, height: 32 }}>
                                        <Tag />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Typography fontSize="0.95rem" fontWeight={500} color="#ff9800">{result.title}</Typography>}
                                    secondary={<Typography fontSize="0.8rem">{result.subtitle}</Typography>}
                                />
                            </StyledListItem>
                        </Link>
                    ))}
                </>
            )}
        </List>
    );
};
