/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Button, Flex, Text, TextField } from "@aws-amplify/ui-react";
export default function CreateFolderForm(props) {
  const { folderName, overrides: overridesProp, ...rest } = props;
  const overrides = { ...overridesProp };
  return (
    <Flex
      gap="3px"
      direction="column"
      width="460px"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      position="relative"
      padding="9px 20px 9px 20px"
      backgroundColor="rgba(255,255,255,1)"
      {...rest}
      {...getOverrideProps(overrides, "Flex")}
    >
      <Flex
        gap="3px"
        direction="column"
        shrink="0"
        alignSelf="stretch"
        overflow="hidden"
        position="relative"
        padding="5px 5px 5px 5px"
        backgroundColor="rgba(255,255,255,1)"
        {...getOverrideProps(overrides, "Flex.Flex[0]")}
      >
        <TextField
          label="Folder Name"
          display="flex"
          shrink="0"
          alignSelf="stretch"
          size="default"
          variation="default"
          value={folderName}
          {...getOverrideProps(overrides, "Flex.Flex[0].TextField[0]")}
        ></TextField>
      </Flex>
      <Flex
        gap="5px"
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        overflow="hidden"
        position="relative"
        padding="5px 5px 5px 5px"
        backgroundColor="rgba(255,255,255,1)"
        {...getOverrideProps(overrides, "Flex.Flex[1]")}
      >
        <Button
          display="flex"
          gap="10px"
          direction="row"
          justifyContent="center"
          alignItems="center"
          shrink="0"
          height="36px"
          position="relative"
          borderRadius="4px"
          padding="8px 10px 8px 10px"
          backgroundColor="rgba(4.000000236555934,125.00000014901161,149.00000631809235,1)"
          {...getOverrideProps(overrides, "Flex.Flex[1].Button[0]")}
        >
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="700"
            color="rgba(255,255,255,1)"
            lineHeight="20px"
            textAlign="left"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            letterSpacing="0.49px"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            children="Cancel"
            {...getOverrideProps(overrides, "Flex.Flex[1].Button[0].Text[0]")}
          ></Text>
        </Button>
        <Button
          display="flex"
          gap="10px"
          direction="row"
          justifyContent="center"
          alignItems="center"
          shrink="0"
          height="36px"
          position="relative"
          borderRadius="4px"
          padding="8px 10px 8px 10px"
          backgroundColor="rgba(4.000000236555934,125.00000014901161,149.00000631809235,1)"
          {...getOverrideProps(overrides, "Flex.Flex[1].Button[1]")}
        >
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="700"
            color="rgba(255,255,255,1)"
            lineHeight="20px"
            textAlign="left"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            letterSpacing="0.49px"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            children="Create"
            {...getOverrideProps(overrides, "Flex.Flex[1].Button[1].Text[0]")}
          ></Text>
        </Button>
      </Flex>
    </Flex>
  );
}
