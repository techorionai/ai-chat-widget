import useConfigColors from "../../../../../hooks/useConfigColors";
import { useConfig } from "../../../../../providers/ConfigProvider";
import sendEventToMain from "../../../../../utils/sendEvent";
import Icon from "../../../../Icon";

export default function ChatWindowHeaderToggleExpandButton() {
  const { config } = useConfig();
  const { headerColor } = useConfigColors();

  const handleToggleExpand = () => {
    sendEventToMain("toggleExpand", {
      expanded: !config.chatWindow?.expanded,
    });
  };

  if (config.chatWindow?.disallowExpand) {
    return null;
  }

  return (
    <Icon
      icon={
        config.chatWindow?.expanded
          ? "outline/arrows-diagonal-minimize-2"
          : "outline/arrows-diagonal"
      }
      iconType="action"
      variant="subtle"
      color={headerColor ?? "gray"}
      onClick={handleToggleExpand}
    />
  );
}
