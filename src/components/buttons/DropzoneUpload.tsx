import { useDropzone } from "react-dropzone";
import {Box, SxProps, Theme, Typography} from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { useTranslation } from 'react-i18next';


interface DropzoneUploadProps {
    onFileChange: (file: File) => void;
    sx?: SxProps<Theme>;
}


function DropzoneUpload({ onFileChange, sx }: DropzoneUploadProps) {
    const {t, ready} = useTranslation();
    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [] },
        multiple: false,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles[0]) onFileChange(acceptedFiles[0]);
        },
    });


    if(!ready) return null;
    return (
        <Box
            {...getRootProps()}
            sx={{
                border: "2px dashed #ccc",
                borderRadius: "12px",
                p: 4,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { borderColor: "black" },
                ...sx,
            }}
        >
            <input {...getInputProps()} />
            <CloudUploadIcon sx={{ fontSize: 40, mb: 1, color: "gray" }} />
            <Typography variant="body1" fontWeight="500">
                {t('dropzone_upload.drag_drop')}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {t('dropzone_upload.choose_file')}
            </Typography>
        </Box>
    );
}

export default DropzoneUpload;
