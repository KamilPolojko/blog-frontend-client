import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Typography, Box } from '@mui/material';
import { BaseLikeButton } from './BaseLikeButton';
import { useLoginModal } from '@/context/LoginModalContext';
import { useMe } from '@/hooks/auth/useMe';
import { useCommentLikeStatus } from '@/hooks/comment/commentLikes/useCommentLikeStatus';
import { useLikeComment } from '@/hooks/comment/commentLikes/useLikeComment';
import { useCommentLikesCount } from '@/hooks/comment/commentLikes/useCommentLikesCount';

interface CommentLikeButtonProps {
    commentId: string;
    showCount?: boolean;
}

export const CommentLikeButton = ({ commentId, showCount = true }: CommentLikeButtonProps) => {
    const { setLoginOpen } = useLoginModal();
    const { data: user } = useMe();
    const { data: isCommentLiked = false, isLoading: likedLoading, isFetching } = useCommentLikeStatus(commentId, user?.id);
    const { data: likesCount = 0, isLoading: countLoading } = useCommentLikesCount(commentId);
    const { mutate: toggleLike, isPending } = useLikeComment(commentId);

    const isLiked = user ? (isFetching ? undefined : isCommentLiked) : false;

    const isLoading = likedLoading || countLoading || isPending;

    const handleToggle = () => {
        if (!user) return;
        toggleLike();
    };

    const likeButton = (
        <BaseLikeButton
            isLiked={isLiked}
            isLoading={isLoading}
            onToggle={handleToggle}
            onLoginRequired={() => setLoginOpen(true)}
            isAuthenticated={!!user}
            likedIcon={<ThumbUpIcon fontSize="small" />}
            unlikedIcon={<ThumbUpOffAltIcon fontSize="small" />}
            color="#1976d2"
            size="small"
        />
    );

    if (!showCount) {
        return likeButton;
    }

    return (
        <Box display="flex" alignItems="center">
            {likeButton}
            <Typography
                variant="caption"
                color="text.secondary"
                sx={{ minWidth: '20px', textAlign: 'center' }}
            >
                {isLoading ? '...' : likesCount}
            </Typography>
        </Box>
    );
};