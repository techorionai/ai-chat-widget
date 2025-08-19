import { Group } from "@mantine/core";
import HomeHeaderAvatar from "./Avatar";
import HomeHeaderCloseButton from "./CloseButton";
import HomeHeaderLogo from "./Logo";

export default function HomeHeader() {
  return (
    <Group justify="space-between" align="center">
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
