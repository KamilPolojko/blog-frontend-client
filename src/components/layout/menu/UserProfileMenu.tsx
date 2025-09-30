import { Tooltip } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import * as React from "react";
import {User} from "@/types/LoginTypes";
import {useLogout} from "@/hooks/auth/useLogout";
import {useState} from "react";
import {MouseEvent} from "react";
import {ROUTES} from "@/routes/routes";
import { useTranslation } from 'react-i18next';

interface UserProfileMenuProps {
    user: User;
}

export default function UserProfileMenu({user}: UserProfileMenuProps){
    const {t,ready} = useTranslation();
    const { mutate: logout } = useLogout();

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const profileTabs = [
        {
            path: ROUTES.USER_PROFILE.SETTINGS,
            text: t('profile_tabs.settings'),
        },
        {
            path: ROUTES.USER_PROFILE.CREATE_ARTICLE,
            text: t('profile_tabs.create_article'),
        },
        {
            path: ROUTES.USER_PROFILE.SAVED_ARTICLES,
            text: t('profile_tabs.saved_articles'),
        },
        {
            path: ROUTES.USER_PROFILE.MY_ARTICLES,
            text: t('profile_tabs.my_articles'),
        }
    ]

    if(!ready) return null
    return (
        <>
            <Tooltip title={user.profile?.firstName || 'Profil'}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                        alt={user.profile?.firstName}
                        src={user.profile?.linkIImage || ''}
                    />
                </IconButton>
            </Tooltip>

            <Menu
                sx={{ mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {profileTabs.map((tab: { path: string, text: string }) => (
                    <Link key={tab.text} href={tab.path} >
                    <MenuItem
                        key={tab.path}
                        onClick={() => {
                            handleCloseUserMenu();
                        }}
                    >
                            {tab.text}
                    </MenuItem>
                    </Link>
                ))}
                <MenuItem
                    onClick={() => {
                        logout();
                        handleCloseUserMenu();
                    }}
                >
                    {t('button.log_out')}
                </MenuItem>
            </Menu>
        </>
    );
}