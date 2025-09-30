export const ROUTES = {
    HOME: '/',
    CATEGORIES: '/categories',
    SEARCH_CATEGORY: ( tag: unknown) => `/categories?category=${tag}`,
    ABOUT: '/about',
    CONTACT_US: '/contact',
    ARTICLES: '/articles',
    ARTICLE: (id: string) => `/articles/${id}`,
    PROFILE: (id: string) => `/client/profile/${id}`,
    USER_PROFILE:{
        SETTINGS: '/settings',
        CREATE_ARTICLE: '/articles/create',
        SAVED_ARTICLES: '/articles/saved',
        MY_ARTICLES: '/articles/mine',
        EDIT_ARTICLE: (id: string) => `/articles/edit/${id}`,
    },
};
