
import { BaseLikeButton } from './BaseLikeButton';
import { useLoginModal } from '@/context/LoginModalContext';
import { useMe } from '@/hooks/auth/useMe';
import { useLikeArticle } from '@/hooks/like/useAddLike';
import { useRemoveLike } from '@/hooks/like/useRemoveLike';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface ArticleLikeButtonProps {
    articleId: string;
    likes?: { user?: { id: string } }[];
}

export const ArticleLikeButton = ({ articleId, likes }: ArticleLikeButtonProps) => {
    const { setLoginOpen } = useLoginModal();
    const { data: user } = useMe();
    const { mutate: likeArticle, isPending: likeLoading } = useLikeArticle();
    const { mutate: removeLike, isPending: removeLoading } = useRemoveLike();

    const isLiked = !!user && likes?.some(like => like?.user?.id === user.id);
    const isLoading = likeLoading || removeLoading;

    const handleToggle = () => {
        if (!user) return;

        if (isLiked) {
            removeLike({ articleId, userId: user.id });
        } else {
            likeArticle({ articleId, userId: user.id });
        }
    };

    return (
        <BaseLikeButton
            isLiked={isLiked}
            isLoading={isLoading}
            onToggle={handleToggle}
            onLoginRequired={() => setLoginOpen(true)}
            isAuthenticated={!!user}
            likedIcon={<FavoriteIcon />}
            unlikedIcon={<FavoriteBorderIcon />}
            color="#ff4c4c"
        />
    );
};