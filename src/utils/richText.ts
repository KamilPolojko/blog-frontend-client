export type FormatType = 'bold' | 'italic' | 'underline' | 'list-bullet' | 'list-numbered';

export function applyFormatToText(
    text: string,
    format: FormatType,
    selectionStart: number,
    selectionEnd: number
): string {
    const selectedText = text.substring(selectionStart, selectionEnd);

    if (!selectedText.trim()) return text;

    let formattedText = '';
    switch (format) {
        case 'bold':
            formattedText = `<strong>${selectedText}</strong>`;
            break;
        case 'italic':
            formattedText = `<em>${selectedText}</em>`;
            break;
        case 'underline':
            formattedText = `<u>${selectedText}</u>`;
            break;
        case 'list-bullet':
            formattedText = `<ul>${selectedText
                .split('\n')
                .filter(Boolean)
                .map(line => `<li>${line.trim()}</li>`)
                .join('')}</ul>`;
            break;
        case 'list-numbered':
            formattedText = `<ol>${selectedText
                .split('\n')
                .filter(Boolean)
                .map(line => `<li>${line.trim()}</li>`)
                .join('')}</ol>`;
            break;
        default:
            return text;
    }

    return text.substring(0, selectionStart) + formattedText + text.substring(selectionEnd);
}


export function convertTextToHtml(text: string, placeholder: string): string {
    if (!text || text.trim() === '') {
        return `<em style="color: #666;">${placeholder}</em>`;
    }

    return text
        .split('\n')
        .map((line) => (line.trim() === '' ? '<br>' : line))
        .join('<br>');
}


