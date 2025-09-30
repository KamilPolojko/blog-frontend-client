'use client';
import {
    useMediaQuery,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    useTheme,
    Box,
    Stack,
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
        <Box
            component="footer"
            sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                boxShadow: `0 -4px 10px ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.2)'}`,
                py: 2,
            }}
        >
            <Box
                sx={{
                    maxWidth: 'xl',
                    mx: 'auto',
                    px: 2,
                }}
            >
                {isDesktop ? (
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={1}
                        sx={{
                            width: '100%',
                            maxWidth: '1200px',
                            mx: 'auto',
                        }}
                    >
                        {footerData.map(({ title, items }, idx) => (
                            <Stack
                                key={idx}
                                spacing={1}
                                sx={{
                                    textAlign: 'center',
                                    p: 2,
                                    flex: '1 1 0',
                                    maxWidth: '300px',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {title}
                                </Typography>
                                {items.map((item, i) => (
                                    <Typography key={i}>{item}</Typography>
                                ))}
                            </Stack>
                        ))}
                    </Stack>
                ) : (
                    <Box>
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
                                    <Stack spacing={1} sx={{ textAlign: 'left' }}>
                                        {items.map((item, i) => (
                                            <Typography key={i}>{item}</Typography>
                                        ))}
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default Footer;