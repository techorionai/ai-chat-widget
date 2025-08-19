import { useConfig } from "../../../../../providers/ConfigProvider";
import Avatars from "../../../../Avatars";

export default function HomeHeaderAvatar() {
  const { config } = useConfig();

  if (!config.chatWindow?.header?.avatars?.length) {
    return null;
  }

  return (
    <Avatars
      avatars={config.chatWindow.header.avatars}
      maxShownAvatars={config.chatWindow.header.maxShownAvatars || 4}
    />
  );
}
