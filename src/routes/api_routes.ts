export const API_ROUTES = {
    AUTH:{
        ME: '/me',
        REGISTER: '/register',
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        RESET_PASSWORD: '/mail/sendVerificaitonCode',
        VERIFY_CODE: '/mail/verifyCode',
    },
    CLIENTS:{
        CLIENTS: '/clients',
        CLIENT_PROFILE:(id: string) => `/client-profile/${id}`,
    },
    PROFILE:{
        CHANGE_PASSWORD: '/change-password',
        CHANGE_EMAIL: '/change-email',
        UPDATE_PROFILE: '/fill-profile',
    },
    ARTICLES:{
        ARTICLES: '/articles',
        ARTICLE: (id: string) => `/articles/${id}`,
        REMOVE_ARTICLE: (id: string) => `/articles/${id}`,
        CREATE_ARTICLE: '/articles/create',
        UPDATE_ARTICLE: '/articles/edit',
        POPULAR: '/articles/popular',
        CREATED_BY_CLIENT: (clientId: string | undefined) => `/articles/client/${clientId}`,
        ADD_LIKE: '/likes',
        REMOVE_LIKE: '/likes',
        LIKES_COUNT: (articleId: string) => `/likes/${articleId}`,
    },
    COMMENTS:{
        COMMENTS: (id: string) => `/comments/${id}`,
        ADD_COMMENT: '/comments',
        REMOVE_COMMENT: (id: string) => `/comments/${id}`,
        EDIT_COMMENT: '/comments',
        COMMENT_LIKES:{
            COMMENT_LIKES_COUNT: (commentId: string) => `/commentLikes/count/${commentId}`,
            COMMENT_LIKE_STATUS: (commentId: string) => `/commentLikes/me/${commentId}`,
            COMMENT_LIKE_TOGGLE: (commentId: string) => `/commentLikes/toggle/${commentId}`,
        }
    },
    SAVED_ARTICLES: {
        ADD_SAVED_ARTICLE: '/saved',
        REMOVE_SAVED_ARTICLE: '/saved',
        SAVED_ARTICLES:(userId: string | undefined) => `/saved/${userId}`,
    },
    CONTACT: {
        CONTACT_US: '/mail/sendContactUsMessage',
    },
    NOTIFICATIONS:{
        NOTIFICATIONS: '/notifications',
        MARK_NOTIFICATION: (id: string) => `/notifications/read/${id}`,
    }
};