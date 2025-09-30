import { useState } from 'react';

export const useCommentUI = () => {
    const [replyTo, setReplyTo] = useState<string | null>(null);
    const [expandedReplies, setExpandedReplies] = useState<{ [key: string]: boolean }>({});
    const [collapsedThreads, setCollapsedThreads] = useState<{ [key: string]: boolean }>({});
    const [editingComment, setEditingComment] = useState<string | null>(null);

    const toggleReply = (commentId: string) => {
        setReplyTo(replyTo === commentId ? null : commentId);
    };

    const expandReplies = (commentId: string) => {
        setExpandedReplies(prev => ({ ...prev, [commentId]: true }));
    };

    const toggleThreadCollapse = (commentId: string) => {
        setCollapsedThreads(prev => ({ ...prev, [commentId]: !prev[commentId] }));
    };

    const startEditing = (commentId: string) => {
        setEditingComment(commentId);
    };

    const stopEditing = () => {
        setEditingComment(null);
    };

    return {
        replyTo,
        expandedReplies,
        collapsedThreads,
        editingComment,
        toggleReply,
        expandReplies,
        toggleThreadCollapse,
        startEditing,
        stopEditing,
    };
};