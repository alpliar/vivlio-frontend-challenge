import { Stack, StackProps } from "@chakra-ui/react";
import React from "react";

export type IBubbleProps = StackProps;

const bubbleStyle: StackProps = {
  spacing: 4,
  padding: 4,
  borderWidth: 3,
  borderRadius: "2xl",
  boxShadow: "xl",
};

const Bubble: React.FC<IBubbleProps> = ({
  children,
  backgroundColor,
  borderColor,
  color,
  ...rest
}) => {
  return (
    <Stack
      color={color}
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      {...bubbleStyle}
      {...rest}
    >
      {children}
    </Stack>
  );
};

export default Bubble;
