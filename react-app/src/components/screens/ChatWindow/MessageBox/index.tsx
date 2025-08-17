import {
  ActionIcon,
  Blockquote,
  Box,
  Group,
  Paper,
  Stack,
  Textarea,
} from "@mantine/core";
import { IconArrowUp } from "@tabler/icons-react";
import { AI_CHAT_WINDOW_MESSAGE_BOX_ID } from "../../../../consts/elementIds";
import { useForm } from "@mantine/form";
import { useParams } from "react-router";
import isSessionClosed from "../../../../utils/isSessionClosed";

interface IChatWindowMessageBoxProps {
  onMessageSubmit: (message: string) => void;
}

export default function ChatWindowMessageBox(
  props: IChatWindowMessageBoxProps
) {
  const { sessionId } = useParams();
  const isClosedSession = isSessionClosed(sessionId || "new");
  const closedSessionMessage = "This session was closed.";
  const form = useForm({
    initialValues: {
      message: "",
      closedSession: isClosedSession,
    },
    validate: {
      message: (value) =>
        value.trim() === "" ? "Message cannot be empty" : null,
      closedSession: (value) => (value ? closedSessionMessage : null),
    },
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (form.validate().hasErrors) return;
    props.onMessageSubmit(form.values.message);
    form.reset();
  };

  if (isClosedSession) {
    return (
      <Box id={AI_CHAT_WINDOW_MESSAGE_BOX_ID} p="md" pt="0px">
        <Blockquote color="blue" p="xs">
          {closedSessionMessage}
        </Blockquote>
      </Box>
    );
  }

  return (
    <Box id={AI_CHAT_WINDOW_MESSAGE_BOX_ID} p="md" pt="0px">
      <Paper shadow="xs" radius="lg" p="xs">
        <form onSubmit={onSubmit}>
          <Stack gap="xs" p="0px">
            <Textarea
              variant="unstyled"
              placeholder={"Type your message..."}
              autosize
              minRows={1}
              maxRows={6}
              radius="md"
              {...form.getInputProps("message")}
            />
            <Group justify="end">
              <ActionIcon
                size="lg"
                radius="xl"
                type="submit"
                disabled={!form.isValid()}
              >
                <IconArrowUp className="action-icon" />
              </ActionIcon>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
