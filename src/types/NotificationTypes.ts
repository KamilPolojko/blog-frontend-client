import { clientType } from './ClientTypes';
import { articleType, CommentType } from './ArticleTypes';

export type NotificationType =
    | 'ARTICLE_LIKED'
    | 'COMMENT_ADDED'
    | 'REPLY_ADDED'
    | 'COMMENT_LIKED'
    | 'ARTICLE_SAVED';

export interface Notification {
    id: string;
    type: NotificationType;
    article: articleType;
    comment?: CommentType;
    recipient: clientType;
    actor: clientType;
    isRead: boolean;
    createdAt: string;
}
