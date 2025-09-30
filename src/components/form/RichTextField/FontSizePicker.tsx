import React, { useState } from "react";
import { IconButton, MenuItem, TextField, Box, Popover } from '@mui/material';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import { Editor } from '@tiptap/core';

const FONT_SIZES = ["2px", "4px", "6px", "8px", "12px", "16px", "24px", "32px", "48px", "64px"];

type FontSizePickerProps = {
    editor: Editor;
};

export default function FontSizePicker({ editor }: FontSizePickerProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [customSize, setCustomSize] = useState("");

    if (!editor) return null;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const applyFontSize = (size: string) => {
        editor.chain().focus().setFontSize(size).run();
        handleClose();
    };

    const handleCustomSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomSize(e.target.value);
    };

    const handleCustomSizeSubmit = () => {
        if (!customSize) return;


        const sizeWithUnit = /^\d+$/.test(customSize)
            ? `${customSize}px`
            : customSize;

        applyFontSize(sizeWithUnit);
    };

    return (
        <Box>
            <IconButton onClick={handleClick}>
                <FormatSizeIcon />
                <ArrowDropDownIcon />
            </IconButton>

            <Popover
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ py: 1 }}>
                    {FONT_SIZES.map(size => (
                        <MenuItem key={size} onClick={() => applyFontSize(size)}>
                            {size}
                        </MenuItem>
                    ))}

                    <Box sx={{ px: 2, py: 1, borderTop: '1px solid #e0e0e0' }}>
                        <TextField
                            label="Custom size"
                            variant="outlined"
                            size="small"
                            value={customSize}
                            onChange={handleCustomSizeChange}
                            onKeyDown={(e) => e.key === "Enter" && handleCustomSizeSubmit()}
                            autoComplete="off"
                        />
                    </Box>
                </Box>
            </Popover>
        </Box>
    );
}
