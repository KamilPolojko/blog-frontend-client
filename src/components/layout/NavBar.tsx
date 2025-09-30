'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from 'next/link';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegistrationModal';
import {useMe} from "@/hooks/auth/useMe";
import HamburgerMenu from "@/components/layout/menu/HamburgerMenu";
import UserProfileMenu from "@/components/layout/menu/UserProfileMenu";
import {useLoginModal} from "@/context/LoginModalContext";
import {ROUTES} from "@/routes/routes";
import { SearchBar } from '@/components/layout/search/SearchBar';
import Image from 'next/image';
import { NotificationsButton } from '@/components/buttons/NotificationButton';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';
import { useColorMode } from '@/components/ThemeRegistry';
import { IconButton } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useState } from 'react';


export default function NavBar() {
    const theme = useTheme();
    const { toggleColorMode } = useColorMode();
    const { data: user } = useMe();
    const { t, ready } = useTranslation();
    const { loginOpen, setLoginOpen } = useLoginModal()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);


    const navbarTabs = [
        { label: t('navbar.home'), path: ROUTES.HOME},
        { label: t('navbar.categories'), path: ROUTES.CATEGORIES },
        { label: t('navbar.about'), path: ROUTES.ABOUT },
        { label: t('navbar.contact'), path: ROUTES.CONTACT_US },
    ];

    if (!ready) return null;
    return (
        <AppBar
            position="static"
            style={{

            }}
            sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderBottom: "1px solid",
                borderColor: theme.palette.divider,
            }}
        >
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                        <Link href="/" className="flex flex-row items-center">
                            <Image
                                src="/Notabene_logo.png"
                                alt="Logo"
                                width={56}
                                height={56}
                                className="h-auto w-14"
                                priority
                                sizes="56px"
                            />
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    ml: 1,
                                    display: { xs: 'none', md: 'flex' },
                                    fontWeight: 700,
                                    letterSpacing: '.15rem',
                                    textDecoration: 'none',
                                }}
                            >
                                {t('website_name')}
                            </Typography>
                        </Link>

                        <HamburgerMenu pages={navbarTabs} />

                        <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 2 }}>
                            {navbarTabs.map((page) => (
                                <Link key={page.label} href={page.path}>
                                    <Button
                                        sx={{
                                            my: 1,
                                            mx: 0.5,
                                            fontWeight: 500,
                                            textTransform: "none",
                                            borderRadius: "8px",
                                            px: 2,
                                            transition: "all 0.2s ease-in-out",
                                        }}
                                    >
                                        {page.label}
                                    </Button>
                                </Link>
                            ))}
                        </Box>

                        <SearchBar placeholder={t('search_bar.placeholder')} />
                    </Box>

                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        {!user ? (
                            <>
                                <LoginModal openLogin={loginOpen} setOpenLogin={setLoginOpen} />
                                <RegisterModal setOpenLogin={setLoginOpen} />
                            </>
                        ) : (
                            <>
                                <NotificationsButton />
                                <UserProfileMenu user={user} />
                            </>
                        )}
                    </Box>

                    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
                        <LanguageSwitcher />
                        <IconButton onClick={toggleColorMode} color="inherit">
                            {theme.palette.mode === "dark" ? <DarkMode /> : <LightMode />}
                        </IconButton>
                    </Box>

                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton onClick={handleMenuOpen} color="inherit">
                            <MoreVert />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                        >
                            <MenuItem
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <LanguageSwitcher />
                            </MenuItem>
                            <MenuItem
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onClick={() => { toggleColorMode();}}
                            >
                                {theme.palette.mode === "dark" ? (
                                    <LightMode fontSize="small" style={{ marginRight: 8 }} />
                                ) : (
                                    <DarkMode fontSize="small" style={{ marginRight: 8 }} />
                                )}
                                {theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
                            </MenuItem>
                        </Menu>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
