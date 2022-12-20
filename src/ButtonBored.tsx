import { RepeatIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import {
  addMessage,
  fetchActivity,
  setIsUserBored,
} from "./app/features/chat/chat.slice";
import { useAppDispatch } from "./app/hooks";
import Message from "./Message";

const ButtonBored: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setIsUserBored(true));
    dispatch(
      addMessage({
        isBotMessage: false,
        text: "I'm bored, help !",
        // image: Images.bored,
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
