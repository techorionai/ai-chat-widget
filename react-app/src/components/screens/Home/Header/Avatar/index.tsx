import { useConfig } from "../../../../../providers/ConfigProvider";
import Avatars from "../../../../Avatars";

export default function HomeHeaderAvatar() {
  const { config } = useConfig();

  if (!config.homeScreenConfig?.avatars?.length) {
    return null;
  }

  return (
    <Avatars avatars={config.homeScreenConfig?.avatars} maxShownAvatars={3} />
  );
}
