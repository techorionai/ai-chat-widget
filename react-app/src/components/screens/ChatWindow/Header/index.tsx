import { Container, Group } from "@mantine/core";
import useConfigColors from "../../../../hooks/useConfigColors";
import ChatWindowHeaderAvatar from "./Avatar";
import ChatWindowHeaderTitle from "./Title";
import ChatWindowHeaderToggleExpandButton from "./ToggleExpandButton";
import ChatWindowHeaderBackToSessionsListButton from "./BackToSessionsListButton";
import { AI_CHAT_WINDOW_HEADER_ID } from "../../../../consts/elementIds";
import ChatWindowHeaderCloseButton from "./CloseButton";

export default function ChatWindowHeader() {
  const { headerBg, headerColor, borderColor } = useConfigColors();

  return (
    <Container
      id={AI_CHAT_WINDOW_HEADER_ID}
      fluid
      bg={headerBg}
      c={headerColor}
      p="sm"
      style={{
        borderBottom: `2px solid ${borderColor}`,
      }}
    >
      <Group justify="space-between" align="center">
        <Group align="center">
          <ChatWindowHeaderBackToSessionsListButton />
          <ChatWindowHeaderAvatar />
          <ChatWindowHeaderTitle />
        </Group>
        <Group align="center" gap="xs">
          <ChatWindowHeaderToggleExpandButton />
          <ChatWindowHeaderCloseButton />
        </Group>
      </Group>
    </Container>
  );
}
