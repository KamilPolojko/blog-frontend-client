import { ReactNode } from "react";

type TableCellProps<T> = {
    value: T[keyof T];
    row: T;
    render?: (value: T[keyof T], row: T) => ReactNode;
};

export function TableCell<T>({ value, row, render }: TableCellProps<T>) {
    return (
        <td
            style={{
                padding: "12px 16px",
                fontSize: "0.9rem",
                whiteSpace: "nowrap",
            }}
        >
            {render ? render(value, row) : String(value)}
        </td>
    );
}
