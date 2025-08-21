import { Box, Container, ScrollArea, Stack } from "@mantine/core";
import NavFooter, { NavFooterHeight } from "../../NavFooter";
import HomeHeader from "./Header";
import useConfigColors from "../../../hooks/useConfigColors";
import HomeHeadings from "./Headings";
import SendUsAMessageCard from "./SendUsAMessageCard";
import HomeCardsBuilder from "./CardsBuilder";
import useElementSizeById from "../../../hooks/useElementSizeById";
import { AI_CHAT_WINDOW_HOME_HEADER_ID } from "../../../consts/elementIds";
import { useConfig } from "../../../providers/ConfigProvider";

export default function Home() {
  const { config } = useConfig();
  const { gradientColor } = useConfigColors();
  const { height: headerHeight } = useElementSizeById(
    AI_CHAT_WINDOW_HOME_HEADER_ID
  );

  const occupiedHeight = headerHeight + NavFooterHeight;

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
      <HomeHeader />
      <ScrollArea h={`calc(100vh - ${occupiedHeight}px)`} p="xl" pb="0px">
        <Box pb={`${NavFooterHeight}px`}>
          <Stack gap="sm">
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
