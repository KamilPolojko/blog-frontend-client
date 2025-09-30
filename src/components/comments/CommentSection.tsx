import { Paper, Stack, Typography, Divider } from '@mui/material';
import { CustomCircularProgress } from '@/styles/CustomCircuralProgress';
import { useCommentUI } from '@/hooks/comment/useCommentUI';
import { CommentType } from '@/types/ArticleTypes';
import { CommentForm } from '@/components/form/CommentForm';
import { CommentItem } from '@/components/comments/CommentItem';
import { User } from '@/types/LoginTypes';
import { useTranslation } from 'react-i18next';

interface CommentSectionProps {
    comments: CommentType[];
    isLoadingComments: boolean;
    user?: User;
    commentManagement: {
        handleAddComment: (content: string, parentId?: string) => void;
        handleRemoveComment: (commentId: string) => void;
        handleEditComment: (commentId: string, content: string) => void;
    };
    commentUI: ReturnType<typeof useCommentUI>;
}

export const CommentSection = ({
                                   comments,
                                   isLoadingComments,
                                   user,
                                   commentManagement,
                                   commentUI
                               }: CommentSectionProps) => {
    const {t ,ready} = useTranslation();
    const rootComments = comments.filter((c) => !c.parent);

    if(!ready) return null;
    return (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 4, mb: 4 }}>
            <CommentForm
                onSubmit={(content) => commentManagement.handleAddComment(content)}
                userAvatar={user?.profile?.linkIImage}
            />

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" mb={2}>
                {t('comments.comment_section.comments')}
            </Typography>

            {isLoadingComments ? (
                <CustomCircularProgress size={20} />
            ) : rootComments.length > 0 ? (
                <Stack spacing={3}>
                    {rootComments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            user={user}
                            commentManagement={commentManagement}
                            commentUI={commentUI}
                            level={0}
                        />
                    ))}
                </Stack>
            ) : (
                <Typography color="text.secondary">
                    {t('comments.comment_section.no_comments')}
                </Typography>
            )}
        </Paper>
    );
};