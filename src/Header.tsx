import { Flex, Heading, Stack } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

type Props = {};

const Header = (props: Props) => {
  return (
    <Flex p={4} justify="space-between">
      <Stack align="center">
        <Heading fontWeight="bold">BoredBot</Heading>
      </Stack>
      <ColorModeSwitcher justifySelf="flex-end" />
    </Flex>
  );
};

export default Header;
