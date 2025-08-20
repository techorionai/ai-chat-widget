import { Image, Paper, Text } from "@mantine/core";
import { ImageCardConfig } from "../../../../../types/mainProcess";
import triggerHomeCardAction from "../../../../../utils/triggerHomeCardAction";

export default function ImageCard(props: {
  config: ImageCardConfig;
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
      {props.config.imageUrl && (
        <Image
          src={props.config.imageUrl}
          alt={props.config.description || "Image Card"}
          mb="sm"
          radius="md"
        />
      )}
      {props.config.title && (
        <Text size="sm" fw="bold">
          {props.config.title}
        </Text>
      )}
      {props.config.description && (
        <Text size="sm">{props.config.description}</Text>
      )}
    </Paper>
  );
}
