import { Container } from "@mantine/core";

import useConfigColors from "../../../hooks/useConfigColors";
import ChatSessionsHeader from "./Header";
import SessionsList from "./Sessions";
import NavFooter from "../../NavFooter";

export default function ChatSessions() {
  const { bg, color } = useConfigColors();

  return (
    <Container fluid bg={bg} c={color} h="100vh" p={0}>
      <ChatSessionsHeader />
      <SessionsList />
      <NavFooter />
    </Container>
  );
}
