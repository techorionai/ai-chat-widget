import { Group } from "@mantine/core";
import HomeHeaderAvatar from "./Avatar";
import HomeHeaderCloseButton from "./CloseButton";
import HomeHeaderLogo from "./Logo";
import { AI_CHAT_WINDOW_HOME_HEADER_ID } from "../../../../consts/elementIds";

export default function HomeHeader() {
  return (
    <Group
      justify="space-between"
      align="center"
      id={AI_CHAT_WINDOW_HOME_HEADER_ID}
      mb="4rem"
    >
      <Group>
        <HomeHeaderLogo />
      </Group>
      <Group>
        <HomeHeaderAvatar />
        <HomeHeaderCloseButton />
      </Group>
    </Group>
  );
}
