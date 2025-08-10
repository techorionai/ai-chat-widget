import { Container, Group } from "@mantine/core";
import useConfigColors from "../../../../hooks/useConfigColors";
import ChatWindowHeaderAvatar from "./Avatar";
import ChatWindowHeaderTitle from "./Title";
import ChatWindowHeaderToggleExpandButton from "./ToggleExpandButton";

export default function ChatWindowHeader() {
  const { headerBg, headerColor, borderColor } = useConfigColors();

  return (
    <Container
      fluid
      bg={headerBg}
      c={headerColor}
      p="sm"
      style={{
        borderBottom: `2px solid ${borderColor}`,
      }}
    >
      <Group justify="space-between">
        <Group>
          <ChatWindowHeaderAvatar />
          <ChatWindowHeaderTitle />
        </Group>
        <Group>
          <ChatWindowHeaderToggleExpandButton />
        </Group>
      </Group>
    </Container>
  );
}
