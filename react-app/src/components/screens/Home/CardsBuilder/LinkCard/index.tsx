import { Box, Group, Paper, Text, ThemeIcon } from "@mantine/core";
import { LinkCardConfig } from "../../../../../types/mainProcess";
import { IconExternalLink, IconSend2 } from "@tabler/icons-react";
import triggerHomeCardAction from "../../../../../utils/triggerHomeCardAction";

export default function LinkCard(props: {
  config: LinkCardConfig;
  idx: number;
}) {
  return (
    <Paper
      shadow="xs"
      p="sm"
      radius="md"
      className="cursor-pointer"
      onClick={() => triggerHomeCardAction([props.idx])}
    >
      <Group justify="space-between" align="center">
        <Box maw="80%">
          {props.config?.title && (
            <Text fz="sm" fw="bold">
              {props.config?.title}
            </Text>
          )}
          {props.config?.description && (
            <Text fz="sm">{props.config?.description}</Text>
          )}
        </Box>
        <ThemeIcon variant="transparent">
          <IconExternalLink className="action-icon" />
        </ThemeIcon>
      </Group>
    </Paper>
  );
}
