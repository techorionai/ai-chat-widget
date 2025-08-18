import { Box, Container, Group, Title } from "@mantine/core";
import useConfigColors from "../../../../hooks/useConfigColors";
import ChatSessionsHeaderCloseButton from "./CloseButton";
import { AI_CHAT_WINDOW_SESSIONS_HEADER_ID } from "../../../../consts/elementIds";

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
      id={AI_CHAT_WINDOW_SESSIONS_HEADER_ID}
    >
      <Group justify="space-between" align="center">
        <Box w="27px" h="27px"></Box>{" "}
        {/* Placeholder to keep the title in the center */}
        <Title fz="lg" ta="center">
          Messages
        </Title>
        <ChatSessionsHeaderCloseButton />
      </Group>
    </Container>
  );
}
