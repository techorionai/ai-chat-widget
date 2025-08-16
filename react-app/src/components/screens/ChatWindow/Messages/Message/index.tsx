import { Box, Group, Paper, Stack, Text } from "@mantine/core";
import { ChatProviderListSessionMessagesMessage } from "../../../../../types/mainProcess";
import getPrettyDate from "../../../../../utils/getPrettyDate";
import useConfigColors from "../../../../../hooks/useConfigColors";
import ChatWindowHeaderAvatar from "../../Header/Avatar";

interface IChatWindowMessageProps
  extends ChatProviderListSessionMessagesMessage {
  _ref?: React.RefObject<HTMLDivElement | null>;
}

export default function ChatWindowMessage(props: IChatWindowMessageProps) {
  const { colorScheme } = useConfigColors();

  const isUser = props.role === "user";
  const isAgent = props.role === "assistant";
  const isTool = props.role === "tool";
  return (
    <Box
      // @ts-ignore
      ref={props._ref !== null ? props.ref : undefined}
      maw="90%"
      ml={isUser ? "auto" : undefined}
      mr={isAgent ? "auto" : undefined}
    >
      <Group justify={isUser ? "flex-end" : "flex-start"} align="flex-start">
        <Stack justify={isUser ? "flex-end" : "flex-start"} gap="4px">
          {isAgent && <ChatWindowHeaderAvatar />}
          <Paper
            shadow="xs"
            py="xs"
            px="sm"
            me={isUser ? "0px" : undefined}
            ms={!isUser ? "0px" : undefined}
            bg={
              isUser
                ? colorScheme === "dark"
                  ? "gray.7"
                  : "gray.7"
                : undefined
            }
            c={
              isUser ? (colorScheme === "dark" ? "white" : "white") : undefined
            }
          >
            <Text>{props.content}</Text>
          </Paper>
          <Text
            size="xs"
            c="gray"
            style={{ textAlign: isUser ? "right" : "left" }}
          >
            {props.createdAt && getPrettyDate(props.createdAt)}
          </Text>
        </Stack>
      </Group>
    </Box>
  );
}
