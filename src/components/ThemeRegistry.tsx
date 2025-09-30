'use client';

import { ReactNode, useEffect, useMemo, useState, createContext, useContext } from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme, CssBaseline, GlobalStyles } from '@mui/material';
import createEmotionCache from '@/utils/createEmotionCache';
import { THEME_COLORS } from '@/constants/theme_colors';

const emotionCache = createEmotionCache();

const ColorModeContext = createContext<{ toggleColorMode: () => void }>({
    toggleColorMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

export default function ThemeRegistry({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
        if (savedMode) setMode(savedMode);
    }, []);

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prev) => {
                    const nextMode = prev === 'light' ? 'dark' : 'light';
                    localStorage.setItem('themeMode', nextMode);
                    return nextMode;
                });
            },
        }),
        []
    );

    const effectiveMode = mounted ? mode : 'light';
    const colors = THEME_COLORS[effectiveMode];

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: effectiveMode,
                    primary: {
                        dark: "#000000",
                        light: "#F0F0EC",
                        main: colors.primary,
                        contrastText: colors.primaryContrast,
                    },
                    background: {
                        default: colors.backgroundDefault,
                        paper: colors.backgroundPaper,
                    },
                    text: {
                        primary: colors.textPrimary,
                        secondary: colors.textSecondary,
                    },
                    divider: colors.divider,
                    action: {
                        hover: colors.hover,
                        selected: colors.selected,
                        disabled: colors.disabled,
                        disabledBackground: colors.disabledBg,
                    },
                },
                components: {
                    MuiAppBar: {
                        styleOverrides: {
                            colorPrimary: {
                                backgroundColor: colors.backgroundPaper,
                                color: colors.textPrimary,
                            },
                        },
                    },
                    MuiButton: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                color: theme.palette.text.primary,
                                transition: "all 0.2s ease-in-out",
                                "&:hover": {
                                    backgroundColor: colors.primaryContrast,
                                    color: colors.backgroundDefault
                                },
                            }),
                        },
                    },
                    MuiAutocomplete: {
                        styleOverrides: {
                            paper: {
                                backgroundColor: colors.backgroundPaper,
                            },
                            option: {
                                color: colors.textPrimary,
                                '&:hover': {
                                    backgroundColor: colors.hoverStrong,
                                    color: "#000",
                                },
                                '&[aria-selected="true"]': {
                                    backgroundColor: colors.selected,
                                    color: colors.textPrimary,
                                },
                            },
                        },
                    },
                    MuiMenuItem: {
                        styleOverrides: {
                            root: {
                                color: colors.textPrimary,
                                transition: "all 0.2s ease-in-out",
                                '&:hover': {
                                    backgroundColor: "#ffffff !important",
                                    color: "#000000 !important",
                                },
                                '&.Mui-selected': {
                                    backgroundColor: colors.selected,
                                    color: colors.textPrimary,
                                    '&:hover': {
                                        backgroundColor: "#ffffff !important",
                                        color: "#000000 !important",
                                    },
                                },
                            },
                        },
                    },
                    MuiTypography: {
                        styleOverrides: {
                            root: {
                                color: colors.textPrimary,
                            },
                        },
                    },
                },
            }),
        [effectiveMode, colors]
    );

    if (!mounted) {
        return null;
    }

    return (
        <CacheProvider value={emotionCache}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <GlobalStyles styles={{
                        body: { backgroundColor: theme.palette.background.default },
                        '.article-content a': {
                            color: colors.link,
                            textDecoration: 'underline',
                            '&:hover': {
                                textDecoration: 'none',
                            },
                        },
                    }} />
                    {children}
                </ThemeProvider>
            </ColorModeContext.Provider>
        </CacheProvider>
    );
}