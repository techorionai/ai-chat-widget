import { Button, Paper, Text } from "@mantine/core";
import { ButtonCardConfig } from "../../../../../types/mainProcess";
import triggerHomeCardAction from "../../../../../utils/triggerHomeCardAction";

export default function ButtonCard(props: {
  config: ButtonCardConfig;
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
      {props.config.title && (
        <Text size="sm" fw="bold">
          {props.config.title}
        </Text>
      )}
      {props.config.description && (
        <Text size="sm" mb="sm">
          {props.config.description}
        </Text>
      )}
      <Button fullWidth>{props.config.buttonText ?? "Let's Go!"}</Button>
    </Paper>
  );
}
