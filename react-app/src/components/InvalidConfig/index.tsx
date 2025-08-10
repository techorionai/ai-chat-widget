import { Box, Container, Flex, Text, Title } from "@mantine/core";

export default function InvalidConfig(props: { reason: string }) {
  return (
    <Container h="100vh">
      <Flex justify="center" align="center" h="100%">
        <Box>
          <Title>Invalid Configuration</Title>
          <Text>{props.reason}</Text>
        </Box>
      </Flex>
    </Container>
  );
}
