import { Box, Title } from "@mantine/core";

export default function HomeHeadings() {
  return (
    <Box mt="4rem">
      <Title order={1} fz="h2">
        Hello👋
      </Title>
      <Title order={2} fz="h2">
        How may we help you?
      </Title>
    </Box>
  );
}
