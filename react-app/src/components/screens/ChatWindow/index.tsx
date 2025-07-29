import { Container, useMantineColorScheme } from "@mantine/core";

import ChatWindowHeader from "./Header";
import { useConfig } from "../../../providers/ConfigProvider";

export default function ChatWindow() {
  const { config } = useConfig();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Container
      fluid
      bg={
        colorScheme === "light"
          ? config.chatWindow?.defaults?.colors?.light?.bg || "white"
          : config.chatWindow?.defaults?.colors?.dark?.bg || "dark"
      }
      c={
        colorScheme === "light"
          ? config.chatWindow?.defaults?.colors?.light?.color || "black"
          : config.chatWindow?.defaults?.colors?.dark?.color || "white"
      }
      h="100vh"
      p={0}
    >
      <ChatWindowHeader />
    </Container>
  );
}
