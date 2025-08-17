import { Container } from "@mantine/core";

import useConfigColors from "../../../hooks/useConfigColors";
import ChatWindowHeader from "./Header";
import ChatWindowMessages from "./Messages";
import ChatWindowMessageBox from "./MessageBox";
import { useForm } from "@mantine/form";

export default function ChatWindow() {
  const { bg, color } = useConfigColors();
  const form = useForm({
    initialValues: {
      isResponding: false,
      message: "",
    },
  });

  const onMessageSubmit = (message: string) => {
    if (form.values.isResponding) return;
    form.setValues({ isResponding: true, message });
  };

  return (
    <Container fluid bg={bg} c={color} h="100vh" p={0}>
      <ChatWindowHeader />
      <ChatWindowMessages
        isResponding={form.values.isResponding}
        respondingMessage={form.values.message}
      />
      <ChatWindowMessageBox onMessageSubmit={onMessageSubmit} />
    </Container>
  );
}
