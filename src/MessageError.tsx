import { RepeatIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import React from "react";
import {
  fetchActivity,
  retryFetchActivity,
} from "./app/features/chat/chat.slice";
import { useAppDispatch } from "./app/hooks";
import Message from "./Message";
import MessageButton from "./MessageButton";

type Props = {};

const MessageError = (props: Props) => {
  const dispatch = useAppDispatch();
  const handleRetry = () => {
    dispatch(retryFetchActivity());
    dispatch(fetchActivity());
  };

  return (
    <Message
      message={{
        isBotMessage: false,
        isDelayed: true,
      }}
    >
      <Flex justifyContent="end">
        <MessageButton leftIcon={<RepeatIcon />} onClick={handleRetry}>
          Could you please retry ?
        </MessageButton>
      </Flex>
    </Message>
  );
};

export default MessageError;
