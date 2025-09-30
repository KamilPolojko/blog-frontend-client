import React from 'react';
import { Modal, Fade, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

interface ConfirmDeleteModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    width: 320,
    borderRadius: 2,
    outline: 'none',
};

export default function ConfirmDeleteModal({
                                               open,
                                               onClose,
                                               onConfirm,
                                               title,
                                               message,
                                           }: ConfirmDeleteModalProps) {
    const {t, ready} = useTranslation();

    if (!ready) return null;
    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slotProps={{
                backdrop: {
                    sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'black',
                            '&:hover': {
                                color: (theme) => theme.palette.primary.main,
                            },
                        }}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        {title}
                    </Typography>
                    <Typography sx={{ mb: 3 }}>{message}</Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                        <Button
                            onClick={onClose}
                            sx={{
                                flex: 1,
                                borderRadius: '24px',
                                border: '1px solid gray',
                                color: 'gray',
                                py: 1.5,
                                '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' },
                            }}
                        >
                            {t('button.cancel')}
                        </Button>
                        <Button
                            onClick={onConfirm}
                            sx={{
                                flex: 1,
                                borderRadius: '24px',
                                bgcolor: 'red',
                                color: 'white',
                                py: 1.5,
                                '&:hover': { backgroundColor: 'darkred' },
                            }}
                        >
                            {t('button.delete')}
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}
