import {
  Box,
  Button,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Typography,
} from "@mantine/core";
import { ChatProviderListSessionMessagesMessage } from "../../../../../types/mainProcess";
import getPrettyDate from "../../../../../utils/getPrettyDate";
import useConfigColors from "../../../../../hooks/useConfigColors";
import ChatWindowHeaderAvatar from "../../Header/Avatar";
import { marked } from "marked";
import { useEffect, useState } from "react";
import sendEventToMain from "../../../../../utils/sendEvent";
import { useConfig } from "../../../../../providers/ConfigProvider";

interface IChatWindowMessageProps
  extends ChatProviderListSessionMessagesMessage {
  isLoading?: boolean;
  _ref?: React.RefObject<HTMLDivElement | null>;
}

export default function ChatWindowMessage(props: IChatWindowMessageProps) {
  const isUser = props.role === "user";
  const isAgent = props.role === "assistant";
  const isTool = props.role === "tool";
  const suggestedActions =
    props.suggestedActions && props.suggestedActions?.length > 0
      ? [...new Set(props.suggestedActions)]
      : [];

  const { config } = useConfig();
  const { colorScheme, primaryColor, colorsMap } = useConfigColors();

  const [htmlContent, setHtmlContent] = useState<string>();

  useEffect(() => {
    const markdownToHtml = async () => {
      const html = await marked(props.content);
      setHtmlContent(html);
    };
    if (isAgent || isTool) {
      markdownToHtml();
    }
  }, [props.content]);

  if (isTool) return null;

  let bg = isUser
    ? colorScheme === "dark"
      ? colorsMap[primaryColor][7]
      : colorsMap[primaryColor][7]
    : undefined;
  let color = isUser ? (colorScheme === "dark" ? "white" : "white") : undefined;

  if (config?.chatWindow?.defaults) {
    const override = isAgent
      ? config.chatWindow.defaults.assistantMessage
      : isUser
      ? config.chatWindow.defaults.userMessage
      : undefined;
    if (override) {
      if (colorScheme === "dark") {
        if (override.dark?.bg) {
          bg = override.dark.bg;
        }
        if (override.dark?.color) {
          color = override.dark.color;
        }
      } else if (colorScheme === "light") {
        if (override.light?.bg) {
          bg = override.light.bg;
        }
        if (override.light?.color) {
          color = override.light.color;
        }
      }
    }
  }

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
            bg={bg}
            c={color}
            radius={config?.chatWindow?.defaults?.messageRadius || undefined}
          >
            {props.isLoading ? (
              <Loader type="dots" size="sm" />
            ) : htmlContent && htmlContent.length ? (
              <Typography>
                <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
              </Typography>
            ) : (
              <Text>{props.content}</Text>
            )}
          </Paper>
          {suggestedActions.length > 0 && (
            <Group gap="3px">
              {suggestedActions.map((action, idx) => (
                <Button
                  key={`action-${action}-idx-${idx}`}
                  variant="light"
                  onClick={() => {
                    sendEventToMain("runAction", {
                      name: action,
                    });
                  }}
                >
                  {action}
                </Button>
              ))}
            </Group>
          )}
          {!props.isLoading && (
            <Text
              size="xs"
              c="gray"
              style={{ textAlign: isUser ? "right" : "left" }}
            >
              {props.createdAt && getPrettyDate(props.createdAt)}
            </Text>
          )}
        </Stack>
      </Group>
    </Box>
  );
}
