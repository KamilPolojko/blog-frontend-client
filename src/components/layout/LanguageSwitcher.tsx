"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ReactCountryFlag from "react-country-flag";

const languages = [
    { code: "pl", countryCode: "PL" },
    { code: "en", countryCode: "GB" }, // Anglia/UK
];

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const handleChange = (_: React.MouseEvent<HTMLElement>, newLang: string | null) => {
        if (newLang) {
            i18n.changeLanguage(newLang);
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <ToggleButtonGroup
                value={i18n.language}
                exclusive
                onChange={handleChange}
                size="small"
            >
                {languages.map((lang) => (
                    <ToggleButton
                        key={lang.code}
                        value={lang.code}
                        sx={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            width: 40,
                            height: 40,
                            minWidth: "auto",
                            p: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            "&.Mui-selected": {
                                backgroundColor: "black",
                                color: "white",
                                "&:hover": { backgroundColor: "black" },
                            },
                        }}
                    >
                        <ReactCountryFlag
                            countryCode={lang.countryCode}
                            svg
                            style={{
                                width: "1.5em",
                                height: "1.5em",
                                borderRadius: "4px",
                            }}
                        />
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Box>
    );
}
