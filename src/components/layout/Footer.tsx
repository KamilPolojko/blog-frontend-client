'use client';
import {
    useMediaQuery,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography, useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';

function Footer() {
    const theme = useTheme();
    const {t, ready} = useTranslation();
    const isDesktop = useMediaQuery('(min-width:768px)');

    const footerData = [
        {
            title: t('footer.title.law_information'),
            items: [t('footer.item.privacy'), t('footer.item.terms')],
        },
        {
            title: t('footer.title.category'),
            items: [t('footer.item.technology'), t('footer.item.sport'), t('footer.item.music')],
        },
        {
            title: t('footer.title.follow'),
            items: [t('footer.item.twitter'), t('footer.item.facebook'), t('footer.item.instagram')],
        },
    ];

    if(!ready) return null;
    return (
        <footer
            style={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                boxShadow: `0 -4px 10px ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.2)'}`,
                padding: '16px 0',
            }}
        >
            <div className="container mx-auto px-2">
                {isDesktop ? (
                    <div className="flex flex-row justify-center items-start gap-8">
                        {footerData.map(({ title, items }, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col gap-2 flex-shrink-0 text-left p-3 rounded"
                            >
                                <span className="text-lg font-bold">
                                    {title}
                                </span>
                                {items.map((item, i) => (
                                    <span key={i}>{item}</span>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        {footerData.map(({ title, items }, idx) => (
                            <Accordion
                                key={idx}
                                sx={{
                                    borderBottom: `2px solid ${theme.palette.divider}`,
                                    '&.Mui-expanded': {
                                        borderBottom: `2px solid ${theme.palette.text.primary}`,
                                        boxShadow: 'none',
                                    },
                                    '&:before': { display: 'none' },
                                    backgroundColor: theme.palette.background.paper,
                                    color: theme.palette.text.primary,
                                    mb: 1,
                                    boxShadow: 'none',
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.text.primary }} />}
                                >
                                    <Typography fontWeight="bold" fontSize="1.1rem">
                                        {title}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="flex flex-col gap-2 text-left">
                                        {items.map((item, i) => (
                                            <span key={i}>{item}</span>
                                        ))}
                                    </div>
                                </AccordionDetails>
                            </Accordion>

                        ))}
                    </div>
                )}
            </div>
        </footer>
    );
}

export default Footer;
