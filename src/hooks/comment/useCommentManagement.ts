import { useAddComment } from '@/hooks/comment/useAddComment';
import { useRemoveComment } from '@/hooks/comment/useRemoveComment';
import { useEditComment } from '@/hooks/comment/useEditComment';
import { useCallback } from 'react';

export const useCommentManagement = (articleId: string, userId: string) => {
    const addCommentMutation = useAddComment();
    const removeCommentMutation = useRemoveComment();
    const editCommentMutation = useEditComment();

    const handleAddComment = useCallback((content: string, parentId?: string) => {
        addCommentMutation.mutate({
            articleId,
            userId,
            content,
            parentId
        });
    }, [addCommentMutation, articleId, userId]);

    const handleRemoveComment = useCallback((commentId: string) => {
        removeCommentMutation.mutate(commentId);
    }, [removeCommentMutation]);

    const handleEditComment = useCallback((commentId: string, content: string) => {
        editCommentMutation.mutate({ commentId, content });
    }, [editCommentMutation]);

    return {
        handleAddComment,
        handleRemoveComment,
        handleEditComment,
        isAdding: addCommentMutation.isPending,
        isRemoving: removeCommentMutation.isPending,
        isEditing: editCommentMutation.isPending
    };
};