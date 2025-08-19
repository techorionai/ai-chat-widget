import { Box, Title } from "@mantine/core";
import { useConfig } from "../../../../providers/ConfigProvider";

export default function HomeHeadings() {
  const { config } = useConfig();
  return (
    <Box mt="4rem">
      <Title order={1} fz="h2" mb="xs">
        {config.homeScreenConfig?.heading ?? "Hello👋"}
      </Title>
      <Title order={2} fz="h2" mb="xs">
        {config.homeScreenConfig?.heading2 ?? "How may we help you?"}
      </Title>
    </Box>
  );
}
