import useConfigColors from "../../../../../hooks/useConfigColors";
import { useConfig } from "../../../../../providers/ConfigProvider";
import sendEventToMain from "../../../../../utils/sendEvent";
import Icon from "../../../../Icon";

export default function ChatSessionsHeaderCloseButton() {
  const { config } = useConfig();

  const { headerColor } = useConfigColors();

  const handleCloseWidget = () => {
    sendEventToMain("closeWidget");
  };

  if (config.disableCloseButton) {
    return null;
  }

  return (
    <Icon
      icon="outline/x"
      iconType="action"
      variant="subtle"
      color={headerColor ?? "gray"}
      onClick={handleCloseWidget}
    />
  );
}
