import { RepeatIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import {
  addMessage,
  fetchActivity,
  resetChat,
  setIsUserBored,
} from "./app/features/chat/chat.slice";
import { useAppDispatch } from "./app/hooks";
import Message from "./Message";

type Props = {};

const ButtonBored = (props: Props) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(resetChat());
    dispatch(setIsUserBored(true));
    dispatch(
      addMessage({
        isBotMessage: false,
        text: "I'm bored, help !",
        // image: MessageImage.Bored,
      })
    );
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
        leftIcon={<RepeatIcon />}
        onClick={handleClick}
      >
        I'm bored...
      </Button>
    </Message>
  );
};

export default ButtonBored;
