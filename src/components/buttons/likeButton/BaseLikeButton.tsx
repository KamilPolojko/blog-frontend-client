import { IconButton } from '@mui/material';
import { useState, ReactNode } from 'react';

interface BaseLikeButtonProps {
    isLiked: boolean | undefined;
    isLoading: boolean;
    onToggle: () => void;
    onLoginRequired: () => void;
    isAuthenticated: boolean;
    likedIcon: ReactNode;
    unlikedIcon: ReactNode;
    color?: string;
    size?: 'small' | 'medium' | 'large';
}

export const BaseLikeButton = ({
                                   isLiked,
                                   isLoading,
                                   onToggle,
                                   onLoginRequired,
                                   isAuthenticated,
                                   likedIcon,
                                   unlikedIcon,
                                   color = '#ff4c4c',
                                   size = 'medium'
                               }: BaseLikeButtonProps) => {
    const [animateLike, setAnimateLike] = useState(false);
    const [animateUnlike, setAnimateUnlike] = useState(false);

    const handleClick = () => {
        if (!isAuthenticated) {
            onLoginRequired();
            return;
        }

        if (isLiked) {
            setAnimateUnlike(true);
        } else {
            setAnimateLike(true);
        }

        onToggle();
    };

    return (
        <IconButton
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClick();
            }}
            disabled={isLoading}
            size={size}
            sx={{
                color: isLiked ? color : 'grey.500',
                transition: 'color 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                animation: animateLike
                    ? 'like-flash 0.7s ease forwards'
                    : animateUnlike
                        ? 'unlike-pop 0.5s ease forwards'
                        : 'none',
                '@keyframes like-flash': {
                    '0%': {
                        filter: 'brightness(1)',
                        transform: 'scale(1)',
                        backgroundPosition: '-150% 150%',
                    },
                    '30%': {
                        filter: 'brightness(2) drop-shadow(0 0 8px rgba(255,255,255,0.8))',
                        transform: 'scale(1.4)',
                        backgroundPosition: '50% -50%',
                    },
                    '70%': {
                        filter: 'brightness(1.5)',
                        transform: 'scale(1.2)',
                        backgroundPosition: '150% -150%',
                    },
                    '100%': {
                        filter: 'brightness(1)',
                        transform: 'scale(1)',
                        backgroundPosition: '250% -250%',
                    },
                },
                ...(animateLike && {
                    backgroundImage:
                        'linear-gradient(45deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 70%)',
                    backgroundSize: '200% 200%',
                    backgroundRepeat: 'no-repeat',
                    maskImage: '-webkit-radial-gradient(white, black)',
                }),
                '@keyframes unlike-pop': {
                    '0%': { transform: 'scale(1)', opacity: 1 },
                    '50%': { transform: 'scale(1.5)', opacity: 0.7 },
                    '100%': { transform: 'scale(1)', opacity: 1 },
                },
            }}
            onAnimationEnd={() => {
                if (animateLike) setAnimateLike(false);
                if (animateUnlike) setAnimateUnlike(false);
            }}
        >
            {isLiked ? likedIcon : unlikedIcon}
        </IconButton>
    );
};