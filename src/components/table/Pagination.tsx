import React from 'react';
import { Box, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { PaginationMeta } from '@/types/PaginationTypes';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
    pagination: PaginationMeta;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

export default function Pagination({ pagination, onPageChange, onLimitChange }: PaginationProps) {
    const { t } = useTranslation();
    const { page, totalPages, total, limit, hasNext, hasPrev } = pagination;

    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (
            let i = Math.max(2, page - delta);
            i <= Math.min(totalPages - 1, page + delta);
            i++
        ) {
            range.push(i);
        }

        if (page - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (page + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2,
                flexWrap: 'wrap',
                gap: 2,
            }}
        >
            <Typography variant="body2" color="text.secondary">
                Pokazuję {(page - 1) * limit + 1}-{Math.min(page * limit, total)} z {total}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                    variant="outlined"
                    size="small"
                    disabled={!hasPrev}
                    onClick={() => onPageChange(page - 1)}
                >
                    Poprzednia
                </Button>

                {getVisiblePages().map((pageNum, index) =>
                    pageNum === '...' ? (
                        <Typography key={index} sx={{ mx: 1 }}>
                            ...
                        </Typography>
                    ) : (
                        <Button
                            key={pageNum}
                            variant={pageNum === page ? 'contained' : 'outlined'}
                            size="small"
                            onClick={() => onPageChange(pageNum as number)}
                            sx={{ minWidth: '40px' }}
                        >
                            {pageNum}
                        </Button>
                    )
                )}

                <Button
                    variant="outlined"
                    size="small"
                    disabled={!hasNext}
                    onClick={() => onPageChange(page + 1)}
                >
                    Następna
                </Button>

                <FormControl size="small" sx={{ minWidth: 80, ml: 2 }}>
                    <InputLabel>Na stronę</InputLabel>
                    <Select
                        value={limit}
                        label="Na stronę"
                        onChange={(e) => onLimitChange(Number(e.target.value))}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
}