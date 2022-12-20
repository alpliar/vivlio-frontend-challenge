import {
  Center,
  ChakraProvider,
  Flex,
  SlideFade,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import AnswerButtons from "./AnswerButtons";
import { useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import ButtonBored from "./ButtonBored";
import Header from "./Header";
import Message from "./Message";
import MessageError from "./MessageError";
import customTheme from "./theme";

export const App = () => {
  const bottomRef = useRef<null | HTMLDivElement>(null);
  const { error, messages, isUserBored, isAnswerNeeded } = useAppSelector(
    (state: RootState) => state.chat
  );

  useEffect(() => {
    // scroll to bottom every time messages change
    if (bottomRef.current && bottomRef.current.scrollIntoView)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAnswerNeeded]);

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
          <Header />

          <Stack overflowY="auto" flex={2} py={3} spacing={4}>
            {messages.length &&
              messages.map((message, index) => (
                <Message key={index} message={message} />
              ))}
            {isAnswerNeeded && (
              <SlideFade in>
                <AnswerButtons />
              </SlideFade>
            )}
            {!isUserBored && (
              <SlideFade in>
                <ButtonBored />
              </SlideFade>
            )}
            {!!error && (
              <SlideFade in>
                <MessageError />
              </SlideFade>
            )}

            <div ref={bottomRef} />
          </Stack>
        </Flex>
      </Center>
    </ChakraProvider>
  );
};
