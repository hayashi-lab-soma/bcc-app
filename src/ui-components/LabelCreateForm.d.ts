/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LabelCreateFormInputValues = {
    name?: string;
    createdAt?: string;
    updatedAt?: string;
};
export declare type LabelCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    updatedAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LabelCreateFormOverridesProps = {
    LabelCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LabelCreateFormProps = React.PropsWithChildren<{
    overrides?: LabelCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LabelCreateFormInputValues) => LabelCreateFormInputValues;
    onSuccess?: (fields: LabelCreateFormInputValues) => void;
    onError?: (fields: LabelCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LabelCreateFormInputValues) => LabelCreateFormInputValues;
    onValidate?: LabelCreateFormValidationValues;
} & React.CSSProperties>;
export default function LabelCreateForm(props: LabelCreateFormProps): React.ReactElement;
