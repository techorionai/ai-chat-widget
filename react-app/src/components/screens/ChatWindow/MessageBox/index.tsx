import { ActionIcon, Box, Group, Paper, Stack, Textarea } from "@mantine/core";
import { IconArrowUp } from "@tabler/icons-react";
import { AI_CHAT_WINDOW_MESSAGE_BOX_ID } from "../../../../consts/elementIds";
import { useForm } from "@mantine/form";

interface IChatWindowMessageBoxProps {
  onMessageSubmit: (message: string) => void;
}

export default function ChatWindowMessageBox(
  props: IChatWindowMessageBoxProps
) {
  const form = useForm({
    initialValues: {
      message: "",
    },
    validate: {
      message: (value) =>
        value.trim() === "" ? "Message cannot be empty" : null,
    },
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (form.validate().hasErrors) return;
    props.onMessageSubmit(form.values.message);
    form.reset();
  };

  return (
    <Box id={AI_CHAT_WINDOW_MESSAGE_BOX_ID} p="md" pt="0px">
      <Paper shadow="xs" radius="lg" p="xs">
        <form onSubmit={onSubmit}>
          <Stack gap="xs" p="0px">
            <Textarea
              variant="unstyled"
              placeholder="Type your message here..."
              autosize
              minRows={1}
              maxRows={6}
              {...form.getInputProps("message")}
            />
            <Group justify="end">
              <ActionIcon radius="xl" type="submit" disabled={!form.isValid()}>
                <IconArrowUp className="action-icon" />
              </ActionIcon>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
