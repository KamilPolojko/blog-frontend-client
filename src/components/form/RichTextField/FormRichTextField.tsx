import React from 'react';
import { useController, Control, FieldPath, FieldValues } from 'react-hook-form';
import RichTextField from './RichTextField';

interface FormRichTextFieldProps<TFieldValues extends FieldValues = FieldValues> {
    name: FieldPath<TFieldValues>;
    control: Control<TFieldValues>;
    label: string;
    placeholder: string;
    rules?: any;
}

export default function FormRichTextField<TFieldValues extends FieldValues = FieldValues>({
                                                                                              name,
                                                                                              control,
                                                                                              label,
                                                                                              placeholder,
                                                                                              rules
                                                                                          }: FormRichTextFieldProps<TFieldValues>) {
    const {
        field: { value, onChange },
        fieldState: { error }
    } = useController({
        name,
        control,
        rules
    });

    return (
        <RichTextField
            label={label}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            error={!!error}
            helperText={error?.message}
        />
    );
}