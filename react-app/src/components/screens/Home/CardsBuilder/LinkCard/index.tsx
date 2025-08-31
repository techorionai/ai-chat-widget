import { Box, Group, Paper, Text } from "@mantine/core";
import { LinkCardConfig } from "../../../../../types/mainProcess";
import triggerHomeCardAction from "../../../../../utils/triggerHomeCardAction";
import Icon from "../../../../Icon";

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
        <Box maw="calc(100% - 2.75rem)">
          {props.config?.title && (
            <Text fz="sm" fw="bold">
              {props.config?.title}
            </Text>
          )}
          {props.config?.description && (
            <Text fz="sm">{props.config?.description}</Text>
          )}
        </Box>
        <Icon icon="outline/external-link" variant="transparent" size="sm" />
      </Group>
    </Paper>
  );
}
