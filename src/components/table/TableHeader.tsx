import { Column } from "@/types/ColumnType";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import { useTheme } from '@mui/material';
import { THEME_COLORS } from '@/constants/theme_colors';
import { memo } from 'react';

type TableHeaderProps<T> = {
    columns: Column<T>[];
    sortConfig: { key: keyof T; direction: "asc" | "desc" } | null;
    onSortChange: (config: { key: keyof T; direction: "asc" | "desc" } | null) => void;
    filters: Record<string, string>;
    onFilterChange: (filters: Record<string, string>) => void;
};

export function TableHeader<T>({
                                   columns,
                                   sortConfig,
                                   onSortChange,
                                   filters,
                                   onFilterChange,
                               }: TableHeaderProps<T>) {
    const theme = useTheme();
    const colors = THEME_COLORS[theme.palette.mode];

    const toggleSort = (key: keyof T) => {
        if (!sortConfig || sortConfig.key !== key) {
            onSortChange({ key, direction: "asc" });
        } else if (sortConfig.direction === "asc") {
            onSortChange({ key, direction: "desc" });
        } else if (sortConfig.direction === "desc") {
            onSortChange(null);
        }
    };

    return (
        <thead>
        <tr style={{ backgroundColor: colors.headerBg }}>
            {columns.map((column) => {
                const isActive = sortConfig?.key === column.key;
                const direction = sortConfig?.direction;

                return (
                    <th
                        key={String(column.key)}
                        style={{
                            textAlign: "left",
                            padding: "12px 16px",
                            fontWeight: 500,
                            fontSize: "0.9rem",
                            color: colors.headerText,
                            borderBottom: `2px solid ${colors.borderDark}`,
                            borderRight: `1px solid ${colors.borderDark}`,
                            cursor: column.sortable ? "pointer" : "default",
                            backgroundColor: colors.headerBg,
                            userSelect: "none",
                        }}
                        onClick={() => column.sortable && toggleSort(column.key as keyof T)}
                    >
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            {column.header}
                            {column.sortable && (
                                <span
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        lineHeight: 0,
                                        marginLeft: "2px",
                                    }}
                                >
                                    <ArrowDropUp
                                        sx={{
                                            color: !isActive
                                                ? colors.headerText
                                                : direction === "asc"
                                                    ? colors.headerText
                                                    : theme.palette.mode === 'light'
                                                        ? "rgba(255,255,255,0.4)"
                                                        : "rgba(0,0,0,0.4)",
                                            fontSize: "30px",
                                            marginBottom: "-10px",
                                        }}
                                    />
                                    <ArrowDropDown
                                        sx={{
                                            color: !isActive
                                                ? colors.headerText
                                                : direction === "desc"
                                                    ? colors.headerText
                                                    : theme.palette.mode === 'light'
                                                        ? "rgba(255,255,255,0.4)"
                                                        : "rgba(0,0,0,0.4)",
                                            fontSize: "30px",
                                            marginTop: "-10px",
                                        }}
                                    />
                                </span>
                            )}
                        </span>
                    </th>
                );
            })}
        </tr>

        <tr>
            {columns.map((column) => (
                <th
                    key={String(column.key)}
                    style={{
                        padding: "6px",
                        backgroundColor: colors.filterBg,
                        borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#e5e7eb' : '#444'}`
                    }}
                >
                    {column.filterable && (
                        <input
                            type="text"
                            placeholder="Filtruj..."
                            value={filters[String(column.key)] || ""}
                            onChange={(e) =>
                                onFilterChange({
                                    ...filters,
                                    [String(column.key)]: e.target.value,
                                })
                            }
                            style={{
                                width: "100%",
                                padding: "6px 8px",
                                border: `1px solid ${colors.inputBorder}`,
                                borderRadius: "6px",
                                fontSize: "0.85rem",
                                backgroundColor: theme.palette.background.default,
                                color: theme.palette.text.primary,
                            }}
                        />
                    )}
                </th>
            ))}
        </tr>
        </thead>
    );
}

export default memo(TableHeader) as typeof TableHeader;
