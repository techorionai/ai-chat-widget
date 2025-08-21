import { MantineTheme, DEFAULT_THEME } from "@mantine/core";

export const theme: MantineTheme = {
  ...DEFAULT_THEME,
  primaryColor: "blue",
  fontFamily: `"Geist", sans-serif`,
  headings: { ...DEFAULT_THEME.headings, fontFamily: `"Roboto", sans-serif` },
};
