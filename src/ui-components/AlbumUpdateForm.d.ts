/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Album } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AlbumUpdateFormInputValues = {
    name?: string;
    auther?: string;
    autherId?: string;
};
export declare type AlbumUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    auther?: ValidationFunction<string>;
    autherId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AlbumUpdateFormOverridesProps = {
    AlbumUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    auther?: PrimitiveOverrideProps<TextFieldProps>;
    autherId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AlbumUpdateFormProps = React.PropsWithChildren<{
    overrides?: AlbumUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    album?: Album;
    onSubmit?: (fields: AlbumUpdateFormInputValues) => AlbumUpdateFormInputValues;
    onSuccess?: (fields: AlbumUpdateFormInputValues) => void;
    onError?: (fields: AlbumUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AlbumUpdateFormInputValues) => AlbumUpdateFormInputValues;
    onValidate?: AlbumUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AlbumUpdateForm(props: AlbumUpdateFormProps): React.ReactElement;
