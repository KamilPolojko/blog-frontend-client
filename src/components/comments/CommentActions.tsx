import { CommentType } from '@/types/ArticleTypes';
import { User } from '@/types/LoginTypes';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { CommentLikeButton } from '@/components/buttons/likeButton/CommentLikeButton';
import { useTranslation } from 'react-i18next';

interface CommentActionsProps {
    comment: CommentType;
    user?: User;
    onRemove: () => void;
    onEdit: () => void;
    onReplyToggle: () => void;
}

export const CommentActions = ({ comment, user, onRemove, onEdit, onReplyToggle }: CommentActionsProps) => {
    const {t, ready} = useTranslation();

    if(!ready) return null;
    return (
        <Stack direction="row" alignItems="center" gap={1} mb={1}>
            <CommentLikeButton commentId={comment.id} />
            {user && (
                <Button size="small" onClick={onReplyToggle}>
                    {t('button.reply')}
                </Button>
            )}
            {user && user.id === comment.author.id && (
                <>
                    <Button size="small" color="info" onClick={onEdit}>
                        {t('button.edit')}
                    </Button>
                    <Button size="small" color="error" onClick={onRemove}>
                        {t('button.delete')}
                    </Button>
                </>
            )}
        </Stack>
    );
}


