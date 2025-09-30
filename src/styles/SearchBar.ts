import { styled } from "@mui/material/styles";
import { Paper, Typography, ListItem, InputBase, InputBaseProps } from '@mui/material';

const SEARCH_HEIGHT = 40;

export const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: (theme.shape.borderRadius as number) * 2,
    backgroundColor: theme.palette.mode === 'light' ? "#f5f5f5" : "#2A2A2A",
    border: `1px solid ${theme.palette.mode === 'light' ? "#ccc" : "#555"}`,
    width: "100%",
    height: SEARCH_HEIGHT,
    transition: theme.transitions.create(["background-color", "border-color", "height"]),
    display: "flex",
    alignItems: "center",
    "&.open": {
        backgroundColor: theme.palette.mode === 'light' ? "#ffffff" : "#1E1E1E",
        border: `2px solid ${theme.palette.mode === 'light' ? "#424242" : "#F0F0EC"}`,
        boxShadow: theme.palette.mode === 'light'
            ? "0px 4px 12px rgba(0, 0, 0, 0.15)"
            : "0px 4px 12px rgba(0, 0, 0, 0.5)",
    },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.text.secondary,
    transition: theme.transitions.create("color"),
    "&.open": {
        color: theme.palette.mode === 'light' ? "#424242" : "#F0F0EC",
    },
}));

export const StyledInputBase = styled(InputBase)<InputBaseProps>(({ theme }) => ({
    color: theme.palette.text.primary,
    width: "100%",
    fontSize: "0.875rem",
    height: SEARCH_HEIGHT,
    padding: `0 ${theme.spacing(1)}px`,
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    display: "flex",
    alignItems: "center",
    "&::placeholder": {
        opacity: 0.7,
        color: theme.palette.text.secondary,
    },
    "&.open::placeholder": {
        color: theme.palette.mode === 'light' ? "#424242" : "#aaa",
    },
}));

export const DropdownPaper = styled(Paper)(({ theme }) => ({
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    zIndex: 1300,
    marginTop: theme.spacing(0.5),
    borderRadius: (theme.shape.borderRadius as number) * 2,
    boxShadow: theme.shadows[8],
    maxHeight: "400px",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
}));

export const CategoryHeader = styled(Typography)(({ theme }) => ({
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.mode === 'light' ? "#f8f9fa" : "#333",
    fontWeight: 600,
    fontSize: "0.875rem",
    color: theme.palette.mode === 'light' ? "#666" : "#aaa",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
    cursor: "pointer",
    transition: theme.transitions.create("background-color"),
    color: theme.palette.text.primary,
    "&:hover": {
        backgroundColor: theme.palette.mode === 'light' ? "#f5f5f5" : "#444",
    },
    padding: theme.spacing(1, 2),
}));