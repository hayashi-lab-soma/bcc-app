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
export declare type ModelLabelsCreateFormInputValues = {
    name?: string;
};
export declare type ModelLabelsCreateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ModelLabelsCreateFormOverridesProps = {
    ModelLabelsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ModelLabelsCreateFormProps = React.PropsWithChildren<{
    overrides?: ModelLabelsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ModelLabelsCreateFormInputValues) => ModelLabelsCreateFormInputValues;
    onSuccess?: (fields: ModelLabelsCreateFormInputValues) => void;
    onError?: (fields: ModelLabelsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ModelLabelsCreateFormInputValues) => ModelLabelsCreateFormInputValues;
    onValidate?: ModelLabelsCreateFormValidationValues;
} & React.CSSProperties>;
export default function ModelLabelsCreateForm(props: ModelLabelsCreateFormProps): React.ReactElement;
