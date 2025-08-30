import { Group } from "@mantine/core";
import HomeHeaderAvatar from "./Avatar";
import HomeHeaderCloseButton from "./CloseButton";
import HomeHeaderLogo from "./Logo";
import { AI_CHAT_WINDOW_HOME_HEADER_ID } from "../../../../consts/elementIds";
import { useConfig } from "../../../../providers/ConfigProvider";

export default function HomeHeader() {
  const { config } = useConfig();
  return (
    <Group
      justify="space-between"
      align="center"
      id={AI_CHAT_WINDOW_HOME_HEADER_ID}
      mb="4rem"
      {...config.homeScreenConfig?.headerContainerProps}
    >
      <Group>
        <HomeHeaderLogo />
      </Group>
      <Group mr="2.5rem">
        <HomeHeaderAvatar />
        <HomeHeaderCloseButton />
      </Group>
    </Group>
  );
}
