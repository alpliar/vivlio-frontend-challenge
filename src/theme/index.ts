import { baseTheme, extendTheme } from "@chakra-ui/react";

const overrides = extendTheme({
  colors: {
    bubble: {
      user: baseTheme.colors.orange,
      bot: baseTheme.colors.teal,
      error: baseTheme.colors.red,
    },
  },
});

export default overrides;
