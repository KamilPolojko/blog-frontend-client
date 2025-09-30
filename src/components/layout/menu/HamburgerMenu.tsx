import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useState} from "react";


interface HamburgerMenuProps{
   pages: {label: string; path: string}[];
}

export default function HamburgerMenu({pages}: HamburgerMenuProps) {

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    return(
        <Box
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }}
        >
            <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
            >
                {pages.map((page) => (
                    <Link key={page.label} href={page.path}>
                        <MenuItem
                            key={page.label}
                            onClick={handleCloseNavMenu}
                        >
                            <Typography
                                textAlign="center"
                                color="inherit"
                            >
                                {page.label}
                            </Typography>
                        </MenuItem>
                    </Link>
                ))}
            </Menu>
        </Box>
    );
}