import { baseTheme, extendTheme } from "@chakra-ui/react";

const overrides = extendTheme({
  colors: {
    bubble: {
      user: baseTheme.colors.orange,
      bot: baseTheme.colors.cyan,
      error: baseTheme.colors.red,
    },
  },
});

export default overrides;
