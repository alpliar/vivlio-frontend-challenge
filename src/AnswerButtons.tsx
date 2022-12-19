import { Button } from "@chakra-ui/react";
import {
  acceptActivity,
  declineActivity,
  fetchActivity,
} from "./app/features/chat/chat.slice";
import { useAppDispatch } from "./app/hooks";
import Message from "./Message";

type Props = {};

const AnswerButtons = (props: Props) => {
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
