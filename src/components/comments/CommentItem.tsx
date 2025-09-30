import React, { useMemo, useCallback, memo } from "react";
import { Box, useTheme, useMediaQuery, Button } from "@mui/material";

import { CommentType } from "@/types/ArticleTypes";
import { ReplyForm } from "@/components/form/ReplyForm";
import { User } from "@/types/LoginTypes";
import { useCommentUI } from "@/hooks/comment/useCommentUI";
import { EditCommentForm } from "@/components/form/EditCommentForm";
import { CommentHeader } from "./CommentHeader";
import { CommentActions } from "./CommentActions";
import { CollapseThreadButton } from '@/components/buttons/CollapseThreadButton';
import CommentContent from '@/components/comments/CommentContent';
import { useTranslation } from 'react-i18next';

interface CommentItemProps {
    comment: CommentType;
    user?: User;
    commentManagement: {
        handleAddComment: (content: string, parentId?: string) => void;
        handleRemoveComment: (commentId: string) => void;
        handleEditComment: (commentId: string, content: string) => void;
    };
    commentUI: ReturnType<typeof useCommentUI>;
    level: number;
}

export const CommentItem = memo(function CommentItem({
                                                         comment,
                                                         user,
                                                         commentManagement,
                                                         commentUI,
                                                         level,
                                                     }: CommentItemProps) {
    const {t, ready} = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const children = comment.children || [];
    const maxVisibleReplies = 2;
    const isExpanded = commentUI.expandedReplies[comment.id];
    const visibleChildren = isExpanded ? children : children.slice(0, maxVisibleReplies);

    const maxDepthBeforeCollapse = isMobile ? 1 : 3;
    const shouldCollapseDeepThread = level >= maxDepthBeforeCollapse && children.length > 0;
    const isThreadCollapsed = commentUI.collapsedThreads[comment.id];

    const totalRepliesInThread = useMemo(() => {
        const countAllReplies = (c: CommentType): number =>
            (c.children?.length || 0) +
            (c.children?.reduce((sum, child) => sum + countAllReplies(child), 0) || 0);

        return countAllReplies(comment);
    }, [comment]);

    const startEditing = useCallback(() => {
        commentUI.startEditing(comment.id);
    }, [comment.id, commentUI]);

    const handleRemove = useCallback(() => {
        commentManagement.handleRemoveComment(comment.id);
    }, [comment.id, commentManagement]);

    const handleReplyToggle = useCallback(() => {
        commentUI.toggleReply(comment.id);
    }, [comment.id, commentUI]);

    const indentSize = isMobile ? 2 : 4;
    const maxLevelForIndent = isMobile ? 1 : 3;

    if(!ready) return null;
    return (
        <Box id={comment.id} ml={level > maxLevelForIndent ? 0 : level * indentSize} mt={1}>
            <CommentHeader comment={comment} level={level} maxLevelForIndent={maxLevelForIndent} />

            {commentUI.editingComment === comment.id ? (
                <EditCommentForm
                    initialValue={comment.content}
                    onSubmit={(content) => {
                        commentManagement.handleEditComment(comment.id, content);
                        commentUI.stopEditing();
                    }}
                    onCancel={commentUI.stopEditing}
                />
            ) : (
                <CommentContent content={comment.content}/>
            )}

            <CommentActions
                comment={comment}
                user={user}
                onRemove={handleRemove}
                onEdit={startEditing}
                onReplyToggle={handleReplyToggle}
            />

            {commentUI.replyTo === comment.id && (
                <ReplyForm
                    commentId={comment.id}
                    authorUsername={comment.author.username}
                    onSubmit={(content, parentId) => {
                        commentManagement.handleAddComment(content, parentId);
                        commentUI.toggleReply(comment.id);
                    }}
                    onCancel={() => commentUI.toggleReply(comment.id)}
                />
            )}

            {shouldCollapseDeepThread && totalRepliesInThread > 0 && (
                <CollapseThreadButton
                    commentId={comment.id}
                    totalReplies={totalRepliesInThread}
                    isCollapsed={isThreadCollapsed}
                    toggle={commentUI.toggleThreadCollapse}
                />
            )}

            {!isThreadCollapsed && (
                <>
                    {level < maxDepthBeforeCollapse ? (
                        <>
                            {visibleChildren.map((child) => (
                                <CommentItem
                                    key={child.id}
                                    comment={child}
                                    user={user}
                                    commentManagement={commentManagement}
                                    commentUI={commentUI}
                                    level={level + 1}
                                />
                            ))}

                            {children.length > maxVisibleReplies && !isExpanded && (
                                <Button
                                    size="small"
                                    onClick={() => commentUI.expandReplies(comment.id)}
                                    sx={{ ml: 2, my: 1 }}
                                >
                                    {t('comments.comment_item.see_more', { count: children.length - maxVisibleReplies })}
                                </Button>
                            )}
                        </>
                    ) : (
                        children.map((child) => (
                            <CommentItem
                                key={child.id}
                                comment={child}
                                user={user}
                                commentManagement={commentManagement}
                                commentUI={commentUI}
                                level={level + 1}
                            />
                        ))
                    )}
                </>
            )}
        </Box>
    );
});
