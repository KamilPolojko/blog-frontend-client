// components/table/TableRow.tsx
import { Column } from "@/types/ColumnType";
import { TableCell } from "@/components/table/TableCell";
import { useTheme } from "@mui/material";
import { THEME_COLORS } from "@/constants/theme_colors";
import { memo } from 'react';

type TableRowProps<T> = {
    row: T;
    columns: Column<T>[];
};

export function TableRow<T extends { id: number | string }>({
                                                                row,
                                                                columns,
                                                            }: TableRowProps<T>) {
    const theme = useTheme();
    const colors = THEME_COLORS[theme.palette.mode];

    return (
        <tr
            style={{
                borderBottom: `1px solid ${colors.border}`,
                transition: "background 0.2s",
                cursor: "pointer",
                color: theme.palette.text.primary,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = colors.hoverStrong)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
            {columns.map((column) => (
                <TableCell
                    key={String(column.key)}
                    value={row[column.key as keyof T]}
                    row={row}
                    render={column.render as any}
                />
            ))}
        </tr>
    );
}

export default memo(TableRow);

