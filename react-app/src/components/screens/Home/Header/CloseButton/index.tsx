import { ActionIcon } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import sendEventToMain from "../../../../../utils/sendEvent";
import { useConfig } from "../../../../../providers/ConfigProvider";

export default function HomeHeaderCloseButton() {
  const { config } = useConfig();

  const handleCloseWidget = () => {
    sendEventToMain("closeWidget");
  };

  if (config.disableCloseButton) {
    return null;
  }

  return (
    <ActionIcon
      pos="fixed"
      top="2.25rem"
      right="2.25rem"
      variant="subtle"
      color="gray"
      style={{ zIndex: 1000 }}
      onClick={handleCloseWidget}
    >
      <IconX className="action-icon" />
    </ActionIcon>
  );
}
