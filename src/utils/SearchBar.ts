import { articleType } from '@/types/ArticleTypes';
import { SearchResult } from '@/types/SearchResultTypes';


export const extractTags = (articles: articleType[]): string[] => {
    const allTags = new Set<string>();
    articles.forEach((article) => {
        if (article.categories) {
            article.categories.forEach((category) => allTags.add(category));
        }
    });
    return Array.from(allTags);
};

export const groupResults = (results: SearchResult[]) => {
    return results.reduce(
        (groups, result) => {
            groups[result.type].push(result);
            return groups;
        },
        { user: [], article: [], tag: [] } as Record<
            "user" | "article" | "tag",
            SearchResult[]
        >
    );
};
