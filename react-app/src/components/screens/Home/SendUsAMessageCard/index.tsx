import { Box, Group, Paper, Text, ThemeIcon } from "@mantine/core";
import { useConfig } from "../../../../providers/ConfigProvider";
import { Link } from "react-router";
import { IconSend2 } from "@tabler/icons-react";

export default function SendUsAMessageCard() {
  const { config } = useConfig();

  if (config.homeScreenConfig?.sendUsAMessageConfig?.hidden) {
    return null;
  }

  return (
    <Link to="/sessions/new">
      <Paper shadow="xs" p="sm" radius="md" className="cursor-pointer">
        <Group justify="space-between" align="center">
          <Box>
            <Text fz="sm" fw="bold">
              {config.homeScreenConfig?.sendUsAMessageConfig?.title ??
                "Send us a message"}
            </Text>
            <Text fz="sm">
              {config.homeScreenConfig?.sendUsAMessageConfig?.description ??
                "Get instant support from our AI assistant."}
            </Text>
          </Box>
          <ThemeIcon variant="transparent">
            <IconSend2 />
          </ThemeIcon>
        </Group>
      </Paper>
    </Link>
  );
}
