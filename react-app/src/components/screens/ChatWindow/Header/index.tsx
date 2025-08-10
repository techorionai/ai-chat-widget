import { Container, Group } from "@mantine/core";
import useConfigColors from "../../../../hooks/useConfigColors";
import ChatWindowHeaderAvatar from "./Avatar";
import ChatWindowHeaderTitle from "./Title";
import ChatWindowHeaderToggleExpandButton from "./ToggleExpandButton";
import ChatWindowHeaderBackToSessionsListButton from "./BackToSessionsListButton";

export default function ChatWindowHeader() {
  const { headerBg, headerColor, borderColor } = useConfigColors();

  return (
    <Container
      id="ai-chat-window-header"
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
        <Group align="center">
          <ChatWindowHeaderToggleExpandButton />
        </Group>
      </Group>
    </Container>
  );
}
