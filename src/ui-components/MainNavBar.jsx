/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Button, Flex, Icon, Text } from "@aws-amplify/ui-react";
export default function MainNavBar(props) {
  const { username, overrides: overridesProp, ...rest } = props;
  const overrides = { ...overridesProp };
  return (
    <Flex
      gap="10px"
      direction="row"
      width="1440px"
      alignItems="center"
      position="relative"
      padding="24px 32px 24px 32px"
      backgroundColor="rgba(255,255,255,1)"
      {...rest}
      {...getOverrideProps(overrides, "Flex")}
    >
      <Flex
        gap="5px"
        direction="row"
        height="36px"
        justifyContent="center"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Flex.Flex[0]")}
      >
        <Icon
          width="30px"
          height="30px"
          pathData="M15 0C6.72 0 0 6.72 0 15C0 23.28 6.72 30 15 30C23.28 30 30 23.28 30 15C30 6.72 23.28 0 15 0ZM7.605 24.42C8.25 23.07 12.18 21.75 15 21.75C17.82 21.75 21.765 23.07 22.395 24.42C20.355 26.04 17.79 27 15 27C12.21 27 9.645 26.04 7.605 24.42ZM24.54 22.245C22.395 19.635 17.19 18.75 15 18.75C12.81 18.75 7.605 19.635 5.46 22.245C3.93 20.235 3 17.73 3 15C3 8.385 8.385 3 15 3C21.615 3 27 8.385 27 15C27 17.73 26.07 20.235 24.54 22.245ZM15 6C12.09 6 9.75 8.34 9.75 11.25C9.75 14.16 12.09 16.5 15 16.5C17.91 16.5 20.25 14.16 20.25 11.25C20.25 8.34 17.91 6 15 6ZM15 13.5C13.755 13.5 12.75 12.495 12.75 11.25C12.75 10.005 13.755 9 15 9C16.245 9 17.25 10.005 17.25 11.25C17.25 12.495 16.245 13.5 15 13.5Z"
          viewBox={{ minX: 0, minY: 0, width: 30, height: 30 }}
          color="rgba(13.000000175088644,26.000000350177288,38.0000015348196,1)"
          shrink="0"
          position="relative"
          {...getOverrideProps(overrides, "Flex.Flex[0].Icon[0]")}
        ></Icon>
      </Flex>
      <Button
        display="flex"
        gap="5px"
        direction="row"
        justifyContent="center"
        alignItems="center"
        shrink="0"
        height="36px"
        position="relative"
        border="0px SOLID rgba(174.00000482797623,179.000004529953,183.00000429153442,1)"
        borderRadius="4px"
        padding="8px 16px 8px 16px"
        {...getOverrideProps(overrides, "Flex.Button[0]")}
      >
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="700"
          color="rgba(13.000000175088644,26.000000350177288,38.0000015348196,1)"
          lineHeight="20px"
          textAlign="center"
          display="flex"
          direction="column"
          justifyContent="center"
          letterSpacing="0.49px"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          children={username}
          {...getOverrideProps(overrides, "Flex.Button[0].Text[0]")}
        ></Text>
      </Button>
    </Flex>
  );
}
