import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

export interface IMessageButtonProps {
  children: React.ReactNode;
  leftIcon?: ButtonProps["leftIcon"];
  onClick: ButtonProps["onClick"];
}

const MessageButton: React.FC<IMessageButtonProps> = ({
  children,
  leftIcon,
  onClick,
}) => {
  return (
    <Button
      variant="outline"
      colorScheme="black"
      leftIcon={leftIcon}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default MessageButton;
