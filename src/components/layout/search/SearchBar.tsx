import React, { useState, useMemo, useRef } from "react";
import { Box, ClickAwayListener } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useGetArticles } from "@/hooks/articles/useGetArticles";
import { useGetClients } from "@/hooks/clients/useGetClients";
import { SearchBarResults } from "./SearchBarResults";
import { SearchResult } from '@/types/SearchResultTypes';
import { extractTags, groupResults } from '@/utils/SearchBar';
import { Search, SearchIconWrapper, StyledInputBase, DropdownPaper } from '@/styles/SearchBar';
import { CustomCircularProgress } from '@/styles/CustomCircuralProgress';
import { useDebounce } from "@/hooks/useDebounce";

interface SearchBarProps {
    onResultSelect?: (result: SearchResult) => void;
    placeholder?: string;
}

export const SearchBar = ({ onResultSelect, placeholder }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const debouncedTerm = useDebounce(searchTerm, 300);

    const { data: articlesData, isLoading: articlesLoading } = useGetArticles(0, 50);
    const { data: clientsData, isLoading: clientsLoading } = useGetClients();
    const isLoading = articlesLoading || clientsLoading;

    const searchResults = useMemo<SearchResult[]>(() => {
        if (!debouncedTerm.trim() || debouncedTerm.length < 2) return [];
        const results: SearchResult[] = [];
        const term = debouncedTerm.toLowerCase();
        const isTagSearch = debouncedTerm.startsWith("#");
        const tagTerm = isTagSearch ? term.slice(1) : term;

        clientsData?.filter(u =>
            !isTagSearch &&
            (u.username?.toLowerCase().includes(term) || u.email?.toLowerCase().includes(term))
        ).slice(0, 5).forEach(u => results.push({
            type: 'user',
            id: u.id,
            title: u.username || 'Bez nazwy',
            subtitle: u.email,
            avatar: u.profile?.linkIImage || undefined,
            data: u
        }));

        articlesData?.articles.filter(a =>
            isTagSearch
                ? a.categories?.some(c => c.toLowerCase().includes(tagTerm))
                : a.title?.toLowerCase().includes(term) || a.description?.toLowerCase().includes(term)
        ).slice(0, isTagSearch ? 10 : 5).forEach(a => results.push({
            type: 'article',
            id: a.id,
            title: a.title || 'Bez tytułu',
            subtitle: a.description,
            data: a
        }));

        if (!isTagSearch) {
            const allTags = extractTags(articlesData?.articles || []);
            allTags.filter(tag => tag.toLowerCase().includes(term)).slice(0, 3)
                .forEach(tag => results.push({
                    type: 'tag',
                    id: tag,
                    title: `#${tag}`,
                    subtitle: `Wyszukaj artykuły z tym tagiem`,
                    data: { tag }
                }));
        }

        return results;
    }, [debouncedTerm, clientsData, articlesData]);

    const grouped = useMemo(() => groupResults(searchResults), [searchResults]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setIsOpen(true);
    };

    const handleFocus = () => setIsOpen(true);

    const handleClickAway = (e: MouseEvent | TouchEvent) => {
        if (inputRef.current?.contains(e.target as Node)) return;
        setIsOpen(false);
    };

    const handleResultClick = (result: SearchResult) => {
        setSearchTerm(result.type === 'tag' ? `#${result.data.tag}` : result.title);
        setIsOpen(false);
        onResultSelect?.(result);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ maxWidth: { xs: '100%', md: '700px' }, flexGrow: 1, position: 'relative' }}>
                <Search className={isOpen ? 'open' : ''}>
                    <SearchIconWrapper className={isOpen ? 'open' : ''}>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        ref={inputRef}
                        placeholder={placeholder}
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchTerm}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        className={isOpen ? 'open' : ''}
                    />
                </Search>
                {isOpen && (
                    <DropdownPaper>
                        {isLoading && debouncedTerm ? (
                            <Box display="flex" justifyContent="center" p={3}>
                                <CustomCircularProgress size={24} />
                            </Box>
                        ) : (
                            <SearchBarResults
                                groupedResults={grouped}
                                onResultClick={handleResultClick}
                            />
                        )}
                    </DropdownPaper>
                )}
            </Box>
        </ClickAwayListener>
    );
};