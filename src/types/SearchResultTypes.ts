export interface SearchResult {
    type: "user" | "article" | "tag";
    id: string;
    title: string;
    subtitle?: string;
    avatar?: string;
    data?: any;
}