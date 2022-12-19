import { Fade, Stack, StackProps, Text } from "@chakra-ui/react";
import React from "react";
import BotAvatar from "./BotAvatar";
import Bubble, { IBubbleProps } from "./Bubble";
import MessageActivity from "./MessageActivity";
import IMessage from "./models/message.model";
import UserAvatar from "./UserAvatar";

export type IMessageProps = {
  children?: React.ReactNode;
  message: IMessage;
  isErrorMessage?: boolean;
};

export const bubbleStyle: IBubbleProps = {
  maxWidth: "md",
};

export const errorBubbleStyle: IBubbleProps = {
  backgroundColor: "bubble.error.100",
  borderColor: "bubble.error.300",
  color: "black",
};

export const botBubbleStyle: IBubbleProps = {
  backgroundColor: "bubble.bot.100",
  borderColor: "bubble.bot.300",
  color: "black",
};

export const userBubbleStyle: IBubbleProps = {
  backgroundColor: "bubble.user.100",
  borderColor: "bubble.user.300",
  color: "black",
};

const Message: React.FC<IMessageProps> = ({
  children,
  message,
  isErrorMessage = false,
}) => {
  const stackDirection: StackProps["direction"] = message.isBotMessage
    ? "row"
    : "row-reverse";
  return (
    <Fade in>
      <Stack padding={1} direction={stackDirection} align="flex-end">
        {message.isBotMessage ? <BotAvatar /> : <UserAvatar />}
        <Bubble
          {...bubbleStyle}
          {...(message.isBotMessage ? botBubbleStyle : userBubbleStyle)}
          {...(isErrorMessage && errorBubbleStyle)}
        >
          {children}
          {message.text && <Text>{message.text}</Text>}
          {message.activity && <MessageActivity activity={message.activity} />}
        </Bubble>
      </Stack>
    </Fade>
  );
};

export default Message;
