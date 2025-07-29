import { Container } from "@mantine/core";

import useConfigColors from "../../../hooks/useConfigColors";
import ChatWindowHeader from "./Header";

export default function ChatWindow() {
  const { bg, color } = useConfigColors();

  return (
    <Container fluid bg={bg} c={color} h="100vh" p={0}>
      <ChatWindowHeader />
    </Container>
  );
}
