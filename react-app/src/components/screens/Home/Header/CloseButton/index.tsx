import { useConfig } from "../../../../../providers/ConfigProvider";
import sendEventToMain from "../../../../../utils/sendEvent";
import Icon from "../../../../Icon";

export default function HomeHeaderCloseButton() {
  const { config } = useConfig();

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
      pos="fixed"
      top="2.25rem"
      right="2.25rem"
      variant="subtle"
      color="gray"
      style={{ zIndex: 1000 }}
      onClick={handleCloseWidget}
    />
  );
}
