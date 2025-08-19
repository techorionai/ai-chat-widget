import { Box, Container, Stack } from "@mantine/core";
import NavFooter, { NavFooterHeight } from "../../NavFooter";
import HomeHeader from "./Header";
import useConfigColors from "../../../hooks/useConfigColors";
import HomeHeadings from "./Headings";
import SendUsAMessageCard from "./SendUsAMessageCard";

export default function Home() {
  const { gradientColor } = useConfigColors();

  return (
    <Container
      fluid
      h="100vh"
      p="xl"
      style={{
        background: gradientColor,
      }}
    >
      <Box pb={`${NavFooterHeight}px`}>
        <HomeHeader />
        <Stack gap="lg">
          <HomeHeadings />
          <SendUsAMessageCard />
        </Stack>
      </Box>
      <NavFooter />
    </Container>
  );
}
