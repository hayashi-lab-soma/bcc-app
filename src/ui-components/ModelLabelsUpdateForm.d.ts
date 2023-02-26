/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ModelLabels } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ModelLabelsUpdateFormInputValues = {
    name?: string;
};
export declare type ModelLabelsUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ModelLabelsUpdateFormOverridesProps = {
    ModelLabelsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ModelLabelsUpdateFormProps = React.PropsWithChildren<{
    overrides?: ModelLabelsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    modelLabels?: ModelLabels;
    onSubmit?: (fields: ModelLabelsUpdateFormInputValues) => ModelLabelsUpdateFormInputValues;
    onSuccess?: (fields: ModelLabelsUpdateFormInputValues) => void;
    onError?: (fields: ModelLabelsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ModelLabelsUpdateFormInputValues) => ModelLabelsUpdateFormInputValues;
    onValidate?: ModelLabelsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ModelLabelsUpdateForm(props: ModelLabelsUpdateFormProps): React.ReactElement;
