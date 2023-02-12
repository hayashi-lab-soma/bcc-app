/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Album } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function AlbumUpdateForm(props) {
  const {
    id: idProp,
    album,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    auther: "",
    autherId: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [auther, setAuther] = React.useState(initialValues.auther);
  const [autherId, setAutherId] = React.useState(initialValues.autherId);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = albumRecord
      ? { ...initialValues, ...albumRecord }
      : initialValues;
    setName(cleanValues.name);
    setAuther(cleanValues.auther);
    setAutherId(cleanValues.autherId);
    setErrors({});
  };
  const [albumRecord, setAlbumRecord] = React.useState(album);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(Album, idProp) : album;
      setAlbumRecord(record);
    };
    queryData();
  }, [idProp, album]);
  React.useEffect(resetStateValues, [albumRecord]);
  const validations = {
    name: [],
    auther: [],
    autherId: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          auther,
          autherId,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Album.copyOf(albumRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "AlbumUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              auther,
              autherId,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Auther"
        isRequired={false}
        isReadOnly={false}
        value={auther}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              auther: value,
              autherId,
            };
            const result = onChange(modelFields);
            value = result?.auther ?? value;
          }
          if (errors.auther?.hasError) {
            runValidationTasks("auther", value);
          }
          setAuther(value);
        }}
        onBlur={() => runValidationTasks("auther", auther)}
        errorMessage={errors.auther?.errorMessage}
        hasError={errors.auther?.hasError}
        {...getOverrideProps(overrides, "auther")}
      ></TextField>
      <TextField
        label="Auther id"
        isRequired={false}
        isReadOnly={false}
        value={autherId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              auther,
              autherId: value,
            };
            const result = onChange(modelFields);
            value = result?.autherId ?? value;
          }
          if (errors.autherId?.hasError) {
            runValidationTasks("autherId", value);
          }
          setAutherId(value);
        }}
        onBlur={() => runValidationTasks("autherId", autherId)}
        errorMessage={errors.autherId?.errorMessage}
        hasError={errors.autherId?.hasError}
        {...getOverrideProps(overrides, "autherId")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || album)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || album) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
