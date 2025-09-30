"use client";

import React, { useState, useCallback, useMemo } from 'react';
import Box from "@mui/material/Box";
import { useMe } from "@/hooks/auth/useMe";
import DataTable from "@/components/table/DataTable";
import { articleType } from "@/types/ArticleTypes";
import { Column } from "@/types/ColumnType";
import Link from "next/link";
import { ROUTES } from "@/routes/routes";
import { useRemoveArticle } from "@/hooks/articles/useRemoveArticle";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import { useGetArticlesCreatedByClient } from "@/hooks/articles/useGetArticlesCreatedByClient";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import { useDebounce } from "@/hooks/useDebounce";

export default function Mine() {
    const { t, ready } = useTranslation();
    const { data: client } = useMe();

    const [openDelete, setOpenDelete] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sortConfig, setSortConfig] = useState<{
        key: keyof articleType;
        direction: "asc" | "desc";
    } | null>({ key: "createdAt", direction: "desc" });

    const [filters, setFilters] = useState<Record<string, string>>({});
    const debouncedFilters = useDebounce(filters, 500);

    const { data, isLoading, isError } = useGetArticlesCreatedByClient({
        clientId: client?.id,
        page,
        limit,
        sortBy: sortConfig?.key as string | undefined,
        sortOrder: sortConfig?.direction,
        filters: debouncedFilters,
    });

    const articles = data?.data ?? [];
    const pagination = data?.pagination;

    const { mutate: removeArticle } = useRemoveArticle();

    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage);
    }, []);

    const handleLimitChange = useCallback((newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
    }, []);

    const handleSortChange = useCallback((config: { key: keyof articleType; direction: "asc" | "desc" } | null) => {
        setSortConfig(config);
        setPage(1);
    }, []);

    const handleFilterChange = useCallback((newFilters: Record<string, string>) => {
        setFilters(newFilters);
        setPage(1);
    }, []);

    const handleDeleteClick = (id: string) => {
        setArticleToDelete(id);
        setOpenDelete(true);
    };

    const confirmDelete = () => {
        if (articleToDelete) {
            removeArticle(articleToDelete);
            setOpenDelete(false);
        }
    };

    const columns: Column<articleType>[] = useMemo(() => {
        console.log('COLUMNS RECREATED');
        return [
            {
                key: "id",
                header: t("table.header.id"),
                sortable: true,
                filterable: true
            },
            {
                key: "title",
                header: t("table.header.title"),
                sortable: true,
                filterable: true
            },
            {
                key: "likesCount",
                header: t("table.header.likes_quantity"),
                render: (value) => value ?? 0,
                sortable: true,
            },
            {
                key: "commentsCount",
                header: t("table.header.comments_quantity"),
                render: (value) => value ?? 0,
                sortable: true,
            },
            {
                key: "savedByCount",
                header: t("table.header.saved_count"),
                sortable: true,
                filterable: true
            },
            {
                key: "readingTime",
                header: t("table.header.reading_time"),
                sortable: true,
                filterable: true
            },
            {
                key: "createdAt",
                header: t("table.header.created_at"),
                render: (value: Date) => new Date(value).toLocaleDateString(),
                sortable: true,
                filterable: true,
                filterValueGetter: (row) => new Date(row.createdAt).toLocaleDateString(),
            },
            {
                key: "isActive",
                header: t("table.header.status"),
                render: (value: boolean) => {
                    const label = value ? t("status.active") : t("status.inactive");
                    return (
                        <Box
                            sx={{
                                display: "inline-block",
                                px: 2,
                                py: 0.5,
                                borderRadius: 1,
                                fontWeight: 500,
                                color: "#fff",
                                backgroundColor: value ? "green" : "red",
                                textAlign: "center",
                                fontSize: "0.85rem",
                                width: "100px",
                            }}
                        >
                            {label}
                        </Box>
                    );
                },
                filterable: true,
                sortable: true,
                filterValueGetter: (row) => (row.isActive ? t("status.active") : t("status.inactive")),
            },
            {
                key: "edit",
                header: t("table.header.edit"),
                render: (_value, row) => (
                    <Link href={ROUTES.USER_PROFILE.EDIT_ARTICLE(row.id)}>
                        <Button
                            sx={{
                                padding: "4px 12px",
                                borderRadius: "6px",
                                backgroundColor: "#3b82f6",
                                color: "#fff",
                                "&:hover": {
                                    backgroundColor: "#2563eb",
                                },
                            }}
                        >
                            {t("button.edit")}
                        </Button>
                    </Link>
                ),
            },
            {
                key: "delete",
                header: t("table.header.delete"),
                render: (_value, row) => (
                    <Button
                        onClick={() => handleDeleteClick(row.id)}
                        sx={{
                            padding: "4px 12px",
                            borderRadius: "6px",
                            backgroundColor: "#ef4444",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#dc2626",
                            },
                        }}
                    >
                        {t("button.delete")}
                    </Button>
                ),
            },
        ]
    }, [t, handleDeleteClick]);

    if (!ready) return null;

    return (
        <Box sx={{ width: "100%", maxWidth: "1620px", mx: "auto", p: 2 }}>
            <DataTable
                data={articles}
                columns={columns}
                isLoading={isLoading}
                isError={isError}
                sortConfig={sortConfig}
                onSortChange={handleSortChange}
                filters={filters}
                onFilterChange={handleFilterChange}
                pagination={pagination}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
            />

            <ConfirmDeleteModal
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={confirmDelete}
                title={t("confirm_delete_modal.title")}
                message={t("confirm_delete_modal.message")}
            />
        </Box>
    );
}