"use client";

import { useState } from "react";
import { Box, Typography, ToggleButton, ToggleButtonGroup, Button } from "@mui/material";
import StarterKit from "@tiptap/starter-kit";
import {
    FormatBold,
    FormatItalic,
    FormatUnderlined,
    FormatAlignLeft,
    FormatAlignCenter,
    FormatAlignRight,
    FormatAlignJustify,
} from "@mui/icons-material";
import { useEditor, EditorContent } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { Placeholder } from '@tiptap/extensions';
import { useTranslation } from 'react-i18next';
import HardBreak from '@tiptap/extension-hard-break';
import { FontSizeMark } from '@/utils/FontSizemark';
import FontSizePicker from '@/components/form/RichTextField/FontSizePicker';

type RichTextFieldProps = {
    label: string;
    value: string;
    onChange: (val: string) => void;
    placeholder: string;
    error?: boolean;
    helperText?: string;
};

export default function RichTextField({
                                          label,
                                          value,
                                          onChange,
                                          placeholder,
                                          error,
                                          helperText,
                                      }: RichTextFieldProps) {
    const {t, ready} = useTranslation();
    const [showPreview, setShowPreview] = useState(false);


    const editor = useEditor({
        extensions: [
            StarterKit,
            FontSizeMark,
            HardBreak.configure({
                keepMarks: true,
            }),
            Underline,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Link.configure({ openOnClick: false }),
            Placeholder.configure({ placeholder }),
        ],
        content: value,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor || !ready) return null;
    return (
        <Box sx={{ width: "100%", mb: 2 }}>
            <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: error ? "error.main" : "text.primary", fontWeight: 500 }}
            >
                {label}
            </Typography>

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
                <ToggleButtonGroup size="small" exclusive>
                    <ToggleButton
                        value="bold"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        selected={editor.isActive("bold")}
                    >
                        <FormatBold />
                    </ToggleButton>
                    <ToggleButton
                        value="italic"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        selected={editor.isActive("italic")}
                    >
                        <FormatItalic />
                    </ToggleButton>
                    <ToggleButton
                        value="underline"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        selected={editor.isActive("underline")}
                    >
                        <FormatUnderlined />
                    </ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup size="small" exclusive>
                    <ToggleButton
                        value="left"
                        onClick={() => editor.chain().focus().setTextAlign("left").run()}
                        selected={editor.isActive({ textAlign: "left" })}
                    >
                        <FormatAlignLeft />
                    </ToggleButton>
                    <ToggleButton
                        value="center"
                        onClick={() => editor.chain().focus().setTextAlign("center").run()}
                        selected={editor.isActive({ textAlign: "center" })}
                    >
                        <FormatAlignCenter />
                    </ToggleButton>
                    <ToggleButton
                        value="right"
                        onClick={() => editor.chain().focus().setTextAlign("right").run()}
                        selected={editor.isActive({ textAlign: "right" })}
                    >
                        <FormatAlignRight />
                    </ToggleButton>
                    <ToggleButton
                        value="justify"
                        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                        selected={editor.isActive({ textAlign: "justify" })}
                    >
                        <FormatAlignJustify />
                    </ToggleButton>
                </ToggleButtonGroup>
                <FontSizePicker editor={editor} />

                <Box sx={{ ml: "auto" }}>
                    <Button
                        size="small"
                        onClick={() => setShowPreview((p) => !p)}
                        variant={showPreview ? "contained" : "outlined"}
                    >
                        {showPreview ? t('button.edition') : t('button.preview')}
                    </Button>
                </Box>
            </Box>

            {showPreview ? (
                <Box
                    className="article-content"
                    sx={{
                        border: "1px solid",
                        borderColor: error ? "error.main" : "divider",
                        borderRadius: 1,
                        p: 2,
                        "& p": { margin: 0 },
                        "& p + p": { marginTop: "0.5em" },
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",

                    }}
                    dangerouslySetInnerHTML={{ __html: value }}
                />

            ) : (
                <Box
                    className="article-content"
                    sx={{
                        border: "1px solid",
                        borderColor: error ? "error.main" : "divider",
                        borderRadius: 1,
                        p: 1,
                        minHeight: "120px",
                        backgroundColor: "background.paper",
                        "& .ProseMirror": {
                            outline: "none",
                            minHeight: "100px",
                            "& p.is-editor-empty:first-of-type::before": {
                                content: `"${placeholder}"`,
                                color: "gray",
                                float: "left",
                                height: 0,
                                pointerEvents: "none",
                            },
                        },
                    }}
                >
                    <EditorContent editor={editor} />
                </Box>
            )}

            {helperText && (
                <Typography
                    variant="caption"
                    sx={{ mt: 0.5, display: "block", color: error ? "error.main" : "text.secondary" }}
                >
                    {helperText}
                </Typography>
            )}
        </Box>
    );
}
