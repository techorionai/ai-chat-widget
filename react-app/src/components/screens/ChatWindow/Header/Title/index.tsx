import { Box, Group, Indicator, Text, Title } from "@mantine/core";
import { useConfig } from "../../../../../providers/ConfigProvider";

export default function ChatWindowHeaderTitle() {
  const { config } = useConfig();

  if (!config.chatWindow?.header?.title) {
    return null;
  }

  return (
    <Box>
      {config.chatWindow.header.title.title && (
        <Title fz="md">{config.chatWindow.header.title.title}</Title>
      )}
      {config.chatWindow.header.title.showOnlineSubtitle && (
        <Group>
          <Indicator processing color="green" pos="relative" left="5px">
            <Box></Box>
          </Indicator>
          <Text c={config.chatWindow?.header?.bg ? undefined : "gray"} fz="xs">
            Online
          </Text>
        </Group>
      )}
    </Box>
  );
}
