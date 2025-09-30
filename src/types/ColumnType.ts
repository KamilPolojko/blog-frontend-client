import {ReactNode} from "react";

type TableColumn<T> = {
    key: keyof T;
    header: string;
    render?: (value: T[keyof T], row: T) => ReactNode;
    sortable?: boolean;
    filterable?: boolean;
    filterValueGetter?: (row: T) => string;
};

type CustomColumn<T> = {
    key: string;
    header: string;
    render: (value: any, row: T) => ReactNode;
    sortable?: boolean;
    filterable?: boolean;
    filterValueGetter?: (row: T) => string;
};

export type Column<T> = TableColumn<T> | CustomColumn<T>;

