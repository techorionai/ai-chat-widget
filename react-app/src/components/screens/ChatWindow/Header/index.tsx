import { Container, Group, useMantineColorScheme } from "@mantine/core";
import ChatWindowHeaderAvatar from "./Avatar";
import ChatWindowHeaderTitle from "./Title";
import { useConfig } from "../../../../providers/ConfigProvider";
import logToIframe from "../../../../utils/logger";
import ChatWindowHeaderToggleExpandButton from "./ToggleExpandButton";
import useConfigColors from "../../../../hooks/useConfigColors";

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
