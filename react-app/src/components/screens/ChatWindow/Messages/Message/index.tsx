import { Box } from "@mantine/core";
import { ChatProviderListSessionMessagesMessage } from "../../../../../types/mainProcess";

interface IChatWindowMessageProps
  extends ChatProviderListSessionMessagesMessage {}

export default function ChatWindowMessage(props: IChatWindowMessageProps) {
  return (
    <Box>
      {JSON.stringify(
        {
          role: props.role,
          content: props.content,
          createdAt: props.createdAt,
          suggestedActions: props.suggestedActions,
        },
        null,
        2
      )}
    </Box>
  );
}
