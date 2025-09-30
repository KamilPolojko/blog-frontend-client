import {RegisterOptions, UseFormReturn} from 'react-hook-form';
import { ReactNode } from 'react';

interface FieldConfig {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    validation?: RegisterOptions;
}

interface DynamicFormModalStatelessProps {
    open: boolean;
    onClose: () => void;
    title: string;
    fields: FieldConfig[];
    onSubmit: (data: any) => void;
    submitButtonText: string;
    extraComponents?: ReactNode;
    form: UseFormReturn<any>;
}

export type { FieldConfig, DynamicFormModalStatelessProps };
