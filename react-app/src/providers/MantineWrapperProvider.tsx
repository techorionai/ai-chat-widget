import { MantineColorsTuple, MantineProvider } from "@mantine/core";
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
  const colorsMap: Record<string, MantineColorsTuple> = {};
  if (config.chatWindow?.defaults?.primaryColor) {
    colorsMap[primaryColorKey] = generateColors(
      config.chatWindow?.defaults?.primaryColor
    );
  }

  return (
    <MantineProvider
      theme={{
        ...theme,
        colors: colorsMap,
        primaryColor: config.chatWindow?.defaults?.primaryColor
          ? config.chatWindow?.defaults?.primaryColor?.startsWith("#")
            ? primaryColorKey
            : config.chatWindow?.defaults?.primaryColor
          : "blue",
      }}
      defaultColorScheme="light"
    >
      {children}
    </MantineProvider>
  );
}
