import { Container, Group, Title } from "@mantine/core";
import useConfigColors from "../../../../hooks/useConfigColors";
import ChatSessionsHeaderCloseButton from "./CloseButton";

export default function ChatSessionsHeader() {
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
      <Group justify="space-between" align="center">
        <Group></Group>
        <Group>
          <Title fz="lg" ta="center">
            Messages
          </Title>
        </Group>
        <Group>
          <ChatSessionsHeaderCloseButton />
        </Group>
      </Group>
    </Container>
  );
}
