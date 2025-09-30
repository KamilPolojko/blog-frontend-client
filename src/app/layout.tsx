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


export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <html lang="pl">
            <body>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <QueryClientProvider client={queryClient}>
                <ThemeRegistry>
                    <LoginModalProvider>
                    <div className={`flex flex-col min-h-screen`}>
                        <NavBar />
                        <main className="flex-grow">{children}</main>
                        <Footer />
                    </div>
                    </LoginModalProvider>
                </ThemeRegistry>
            </QueryClientProvider>
            </LocalizationProvider>
            </body>
        </html>
    );
}
