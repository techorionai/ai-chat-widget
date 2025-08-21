import {
  MantineColorsTuple,
  MantineProvider,
  MantineTheme,
  mergeMantineTheme,
} from "@mantine/core";
import { generateColors } from "@mantine/colors-generator";
import { theme } from "../theme";
import { useConfig } from "./ConfigProvider";

export default function MantineWrapperProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { config } = useConfig();
  const primaryColorKey = "primary-color";
  const colorsMap: Record<string, MantineColorsTuple> = {
    ...theme.colors,
  };
  if (config.chatWindow?.defaults?.primaryColor) {
    colorsMap[primaryColorKey] = generateColors(
      config.chatWindow?.defaults?.primaryColor
    );
  }

  const baseTheme: MantineTheme = {
    ...theme,
    colors: colorsMap,
    primaryColor: config.chatWindow?.defaults?.primaryColor
      ? config.chatWindow?.defaults?.primaryColor?.startsWith("#")
        ? primaryColorKey
        : config.chatWindow?.defaults?.primaryColor
      : "blue",
  };

  let finalTheme: MantineTheme | undefined = undefined;
  if (config.chatWindow?.defaults?.mantineThemeOverride) {
    finalTheme = mergeMantineTheme(
      baseTheme,
      config.chatWindow?.defaults?.mantineThemeOverride
    );
  }

  return (
    <MantineProvider
      theme={finalTheme ? finalTheme : baseTheme}
      defaultColorScheme="light"
    >
      {children}
    </MantineProvider>
  );
}
