import { RepeatIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  ChakraProvider,
  Flex,
  Heading,
  SlideFade,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useReducer, useRef, useState } from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Message from "./Message";
import MessageButton from "./MessageButton";
import { IActivity } from "./models/activity.model";
import IMessage from "./models/message.model";
import {
  defaultState,
  MessageActionKind,
  rootReducer,
} from "./reducers/root.reducer";
import ActivityHelper from "./services/activities.service";
import customTheme from "./theme";

export const App = () => {
  const bottomRef = useRef<null | HTMLDivElement>(null);
  const [state, dispatch] = useReducer(rootReducer, defaultState);
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActivityAccepted, setIsActivityAccepted] = useState<boolean>(false);
  const [isUserBored, setIsUserBored] = useState<boolean>(false);

  const saveMessage = (message: IMessage) => {
    dispatch({
      type: MessageActionKind.ADD,
      payload: message,
    });
  };

  const handleRetry = () => {
    saveMessage({ text: "Could you please retry ?" });
    fetchActivity();
  };

  const handleReset = () => {
    setIsActivityAccepted(false);
    setIsUserBored(true);
    dispatch({
      type: MessageActionKind.RESET,
    });
    dispatch({
      type: MessageActionKind.ADD,
      payload: {
        isBotMessage: false,
        text: "I'm bored, help !",
      },
    });
    fetchActivity();
  };

  const handleRefuseActivity = () => {
    saveMessage({ text: "Hmm... Maybe another time 🙃" });
    fetchActivity();
  };

  const handleAcceptActivity = () => {
    setIsActivityAccepted(true);
    setIsUserBored(false);
    saveMessage({ text: "Thank's, i'm going to 😁 !" });
    saveMessage({
      text: "No problem, feel free to come back to me next time you're bored 😊",
      isBotMessage: true,
      isDelayed: true,
    });
  };

  const fetchActivity = (ignore: boolean = false) => {
    setIsLoading(true);

    ActivityHelper.getRandomActivity()
      .then((newActivity) => {
        if (!ignore)
          saveMessage({
            isBotMessage: true,
            activity: newActivity,
            isDelayed: true,
          });
        setError(undefined);
      })
      .catch((error) => {
        saveMessage({
          text: "Sorry, i'm not feeling well right now 🤕 Can you make sure that you are online 🛜 ?",
          isBotMessage: true,
          isErrorMessage: true,
          isDelayed: true,
        });
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // scroll to bottom every time messages change
    if (bottomRef.current && bottomRef.current.scrollIntoView)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [state.messages, error, isUserBored]);

  return (
    <ChakraProvider theme={customTheme}>
      <Center>
        <Flex
          height="100vh"
          direction="column"
          as={Stack}
          fontSize={{ base: "md", md: "xl" }}
          p={3}
          width={{ base: "sm", sm: "md", md: "xl", lg: "2xl" }}
        >
          <Flex p={4} justify="space-between">
            <Stack align="center">
              <Heading fontWeight="bold">BoredBot</Heading>
            </Stack>
            <ColorModeSwitcher justifySelf="flex-end" />
          </Flex>

          <Stack overflowY="auto" flex={2} py={3} spacing={4}>
            {state.messages.length &&
              state.messages.map((message, index) => (
                <>
                  <Message key={index} message={message} />
                </>
              ))}
            {!error && !isLoading && (
              <>
                {!isActivityAccepted && isUserBored && (
                  <SlideFade in>
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
                        onClick={handleRefuseActivity}
                      >
                        Hmm...
                      </Button>
                    </Message>
                  </SlideFade>
                )}
                {(isActivityAccepted || !isUserBored) && (
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
                      onClick={handleReset}
                    >
                      I'm bored...
                    </Button>
                  </Message>
                )}
              </>
            )}
            {!!error && (
              <>
                <Message
                  message={{
                    isBotMessage: false,
                  }}
                >
                  <Flex justifyContent="end">
                    <MessageButton
                      leftIcon={<RepeatIcon />}
                      onClick={handleRetry}
                    >
                      Could you please retry ?
                    </MessageButton>
                  </Flex>
                </Message>
              </>
            )}
            <div ref={bottomRef} />
          </Stack>
        </Flex>
      </Center>
    </ChakraProvider>
  );
};
