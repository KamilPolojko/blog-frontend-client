"use client";

import "../lib/i18n";
import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode, useState} from "react";
import {LoginModalProvider} from "@/context/LoginModalContext";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Box } from '@mui/material';


export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <html lang="pl">
            <body style={{ margin: 0, padding: 0 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <QueryClientProvider client={queryClient}>
                <ThemeRegistry>
                    <LoginModalProvider>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                minHeight: '100vh',
                            }}
                        >
                            <NavBar />
                            <Box
                                component="main"
                                sx={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                {children}
                            </Box>
                            <Footer />
                        </Box>
                    </LoginModalProvider>
                </ThemeRegistry>
            </QueryClientProvider>
            </LocalizationProvider>
            </body>
        </html>
    );
}