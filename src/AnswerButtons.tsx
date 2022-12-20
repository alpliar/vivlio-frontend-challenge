import { Button } from "@chakra-ui/react";
import React from "react";
import {
  acceptActivity,
  declineActivity,
  fetchActivity,
} from "./app/features/chat/chat.slice";
import { useAppDispatch } from "./app/hooks";
import Message from "./Message";

const AnswerButtons: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleAcceptActivity = () => {
    dispatch(acceptActivity());
  };

  const handleDeclineActivity = () => {
    dispatch(declineActivity());
    dispatch(fetchActivity());
  };
  return (
    <Message
      message={{
        isBotMessage: false,
        isDelayed: true,
      }}
    >
      <Button
        variant="outline"
        colorScheme="black"
        onClick={handleAcceptActivity}
      >
        Thanks 😁 !
      </Button>
      <Button
        variant="outline"
        colorScheme="black"
        onClick={handleDeclineActivity}
      >
        Hmm...
      </Button>
    </Message>
  );
};

export default AnswerButtons;
