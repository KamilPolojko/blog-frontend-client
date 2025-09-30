// extensions/FontSizeMark.ts
import { Mark, mergeAttributes, CommandProps } from '@tiptap/core';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (size: string) => ReturnType;
            unsetFontSize: () => ReturnType;
        };
    }
}

export const FontSizeMark = Mark.create({
    name: 'fontSize',

    addAttributes() {
        return {
            size: {
                default: null,
                parseHTML: el => el.style.fontSize,
                renderHTML: attrs => {
                    if (!attrs.size) return {};
                    return { style: `font-size: ${attrs.size}` };
                },
            },
        };
    },

    parseHTML() {
        return [{ tag: 'span[style*="font-size"]' }];
    },

    renderHTML({ HTMLAttributes }) {
        return ['span', mergeAttributes(HTMLAttributes), 0];
    },

    addCommands() {
        return {
            setFontSize:
                (size: string) =>
                    ({ chain }: CommandProps) => {
                        return chain().setMark(this.name, { size }).run();
                    },
        };
    },
});
