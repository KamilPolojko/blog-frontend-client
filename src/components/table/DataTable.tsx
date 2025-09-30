"use client";

import { Column } from "@/types/ColumnType";
import { TableHeader } from "@/components/table/TableHeader";
import { TableRow } from "@/components/table/TableRow";
import Box from "@mui/material/Box";
import { CustomCircularProgress } from "@/styles/CustomCircuralProgress";
import { useTranslation } from "react-i18next";
import { PaginationMeta } from "@/types/PaginationTypes";
import Pagination from '@/components/table/Pagination';
import { useTheme } from '@mui/material';

type DataTableProps<T> = {
    data?: T[];
    columns: Column<T>[];
    isLoading?: boolean;
    isError?: boolean;
    sortConfig: { key: keyof T; direction: "asc" | "desc" } | null;
    onSortChange: (config: { key: keyof T; direction: "asc" | "desc" } | null) => void;
    filters: Record<string, string>;
    onFilterChange: (filters: Record<string, string>) => void;
    pagination?: PaginationMeta;
    onPageChange?: (page: number) => void;
    onLimitChange?: (limit: number) => void;
};

export default function DataTable<T extends { id: number | string }>({
                                                                         data = [],
                                                                         columns,
                                                                         isLoading = false,
                                                                         isError = false,
                                                                         sortConfig,
                                                                         onSortChange,
                                                                         filters,
                                                                         onFilterChange,
                                                                         pagination,
                                                                         onPageChange,
                                                                         onLimitChange,
                                                                     }: DataTableProps<T>) {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Box>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    boxShadow:
                        theme.palette.mode === "light"
                            ? "0 2px 4px rgba(60,60,60,0.06)"
                            : "0 2px 4px rgba(0,0,0,0.3)",
                    borderRadius: "8px",
                    border: `1px solid ${theme.palette.divider}`,
                    padding: "16px",
                    backgroundColor: theme.palette.background.default,
                    overflowX: "auto",
                }}
            >
                <table
                    style={{
                        minWidth: "100%",
                        borderCollapse: "collapse",
                        border: `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme.palette.background.default,
                    }}
                >
                    <TableHeader
                        columns={columns}
                        sortConfig={sortConfig}
                        onSortChange={onSortChange}
                        filters={filters}
                        onFilterChange={onFilterChange}
                    />
                    <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={columns.length} style={{ textAlign: "center", padding: "16px" }}>
                                <CustomCircularProgress />
                            </td>
                        </tr>
                    ) : isError ? (
                        <tr>
                            <td colSpan={columns.length} style={{ textAlign: "center", padding: "16px" }}>
                                {t("article.errors.load_error")}
                            </td>
                        </tr>
                    ) : !data || data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} style={{ textAlign: "center", padding: "16px" }}>
                                {t("article.errors.not_found")}
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => <TableRow key={row.id} row={row} columns={columns} />)
                    )}
                    </tbody>
                </table>
            </Box>

            {pagination && onPageChange && onLimitChange && (
                <Pagination
                    pagination={pagination}
                    onPageChange={onPageChange}
                    onLimitChange={onLimitChange}
                />
            )}
        </Box>
    );
}
