import { RepeatIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  ChakraProvider,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useReducer, useRef, useState } from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Message from "./Message";
import { IActivity } from "./models/activity.model";
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

  const saveMessage = (
    text: string | undefined = undefined,
    isBotMessage: boolean = false,
    activity: IActivity | undefined = undefined
  ) => {
    dispatch({
      type: MessageActionKind.ADD,
      payload: {
        text,
        activity,
        isBotMessage,
      },
    });
  };

  const handleRetry = () => {
    fetchActivity();
  };

  const handleReset = () => {
    dispatch({
      type: MessageActionKind.RESET,
    });
    dispatch({
      type: MessageActionKind.ADD,
      payload: {
        isBotMessage: false,
        text: "I'm bored",
      },
    });
    setIsActivityAccepted(false);
    setIsUserBored(true);
    fetchActivity();
  };

  const handleRefuseActivity = () => {
    saveMessage("Maybe another time 🙃");
    fetchActivity();
  };

  const handleAcceptActivity = () => {
    setIsActivityAccepted(true);
    setIsUserBored(false);
    saveMessage("Thank's, that's what i needed 😁 !");
    saveMessage(
      "No problem, feel free to come back to me next time you're bored 😊",
      true
    );
  };

  const fetchActivity = (ignore: boolean = false) => {
    setIsLoading(true);

    ActivityHelper.getRandomActivity()
      .then((newActivity) => {
        if (!ignore) saveMessage(undefined, true, newActivity);
        setError(undefined);
      })
      .catch((error) => {
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
  }, [state.messages]);

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
                <Message key={index} message={message} />
              ))}
            {!error && !isLoading && (
              <>
                {!isActivityAccepted && isUserBored && (
                  <Message
                    message={{
                      isBotMessage: false,
                    }}
                  >
                    <Button
                      variant="outline"
                      colorScheme="black"
                      onClick={handleAcceptActivity}
                    >
                      Thanks, that's what i needed 😁 !
                    </Button>
                    <Button
                      variant="outline"
                      colorScheme="black"
                      onClick={handleRefuseActivity}
                    >
                      Maybe another time 🙃
                    </Button>
                  </Message>
                )}
                {(isActivityAccepted || !isUserBored) && (
                  <Message
                    message={{
                      isBotMessage: false,
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
              <Message
                message={{
                  isBotMessage: true,
                }}
                isErrorMessage
              >
                <Text>Sorry, something went wrong</Text>
                <Button
                  colorScheme="bubble.error"
                  variant="solid"
                  isLoading={isLoading}
                  leftIcon={<RepeatIcon />}
                  onClick={handleRetry}
                >
                  Retry
                </Button>
              </Message>
            )}
            <div ref={bottomRef} />
          </Stack>
        </Flex>
      </Center>
    </ChakraProvider>
  );
};
