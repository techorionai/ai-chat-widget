import { Box, Container, ScrollArea, Stack } from "@mantine/core";
import useConfigColors from "../../../hooks/useConfigColors";
import { useConfig } from "../../../providers/ConfigProvider";
import NavFooter, { NavFooterHeight } from "../../NavFooter";
import HomeCardsBuilder from "./CardsBuilder";
import HomeHeader from "./Header";
import HomeHeadings from "./Headings";
import SendUsAMessageCard from "./SendUsAMessageCard";

export default function Home() {
  const { config } = useConfig();
  const { gradientColor } = useConfigColors();

  const occupiedHeight = NavFooterHeight;

  const bgType = config?.homeScreenConfig?.bgColor?.type || "default";
  const customBg = config?.homeScreenConfig?.bgColor?.background;

  return (
    <Container
      fluid
      h="100vh"
      style={{
        background:
          bgType === "custom"
            ? customBg
            : bgType === "default"
            ? gradientColor
            : undefined,
      }}
      p={0}
    >
      <ScrollArea h={`calc(100vh - ${occupiedHeight}px)`} p="xl" pb="0px">
        <Box pb={`${NavFooterHeight}px`}>
          <Stack gap="sm">
            <HomeHeader />
            <HomeHeadings />
            <SendUsAMessageCard />
            <HomeCardsBuilder />
          </Stack>
        </Box>
      </ScrollArea>
      <NavFooter />
    </Container>
  );
}
