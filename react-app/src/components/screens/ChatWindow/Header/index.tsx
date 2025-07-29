import { Container, Group, useMantineColorScheme } from "@mantine/core";
import ChatWindowHeaderAvatar from "./Avatar";
import ChatWindowHeaderTitle from "./Title";
import { useConfig } from "../../../../providers/ConfigProvider";
import logToIframe from "../../../../utils/logger";

export default function ChatWindowHeader() {
  const { config } = useConfig();
  const { colorScheme } = useMantineColorScheme();

  logToIframe(
    "bg",
    config.chatWindow?.header?.bg ||
      (colorScheme === "light"
        ? config.chatWindow?.defaults?.colors?.light?.bg || "white"
        : config.chatWindow?.defaults?.colors?.dark?.bg || "dark")
  );

  return (
    <Container
      fluid
      bg={
        config.chatWindow?.header?.bg ||
        (colorScheme === "light"
          ? config.chatWindow?.defaults?.colors?.light?.bg || "white"
          : config.chatWindow?.defaults?.colors?.dark?.bg || "dark")
      }
      c={
        config.chatWindow?.header?.color ||
        (colorScheme === "light"
          ? config.chatWindow?.defaults?.colors?.light?.color || "black"
          : config.chatWindow?.defaults?.colors?.dark?.color || "white")
      }
      p="sm"
      style={{
        borderBottom: `2px solid rgba(245, 245, 245, ${
          colorScheme === "light" ? 1 : 0.25
        })`,
      }}
    >
      <Group>
        <ChatWindowHeaderAvatar />
        <ChatWindowHeaderTitle />
      </Group>
    </Container>
  );
}
