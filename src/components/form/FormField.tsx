import { TextField } from "@mui/material";
import { useController } from "react-hook-form";
import { ReactNode } from "react";

interface FormFieldProps {
    name: string;
    label: string;
    control: any;
    type?: string;
    placeholder?: string;
    onFileChange?: (file: File) => void;
    rules?: any;
    render?: (params: {
        field: any;
        fieldState: {
            error?: any;
            isTouched: boolean;
            isDirty: boolean;
            invalid: boolean;
        };
    }) => ReactNode;
    [x: string]: any;
}

export default function FormField({
                                      name,
                                      label,
                                      control,
                                      type = "text",
                                      placeholder,
                                      render,
                                      rules,
                                      ...props
                                  }: FormFieldProps) {
    const {
        field,
        fieldState,
    } = useController({
        name,
        control,
        rules,
    });

    return render ? (
        <>{render({ field, fieldState })}</>
    ) : (
        <TextField
            {...field}
            type={type}
            label={label}
            placeholder={placeholder}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
            variant="outlined"
            margin="dense"
            slotProps={{
                formHelperText: {
                    sx: { color: 'error.main' }
                }
            }}
            {...props}
        />

    );
}
