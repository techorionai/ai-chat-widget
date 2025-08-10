import { Container, Group, Title } from "@mantine/core";
import useConfigColors from "../../../../hooks/useConfigColors";

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
      <Title fz="lg" ta="center">
        Messages
      </Title>
    </Container>
  );
}
