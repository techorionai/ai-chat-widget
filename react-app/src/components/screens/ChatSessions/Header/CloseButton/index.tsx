import { ActionIcon } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import useConfigColors from "../../../../../hooks/useConfigColors";
import sendEventToMain from "../../../../../utils/sendEvent";
import { useConfig } from "../../../../../providers/ConfigProvider";

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
    <ActionIcon
      variant="subtle"
      color={headerColor ?? "gray"}
      onClick={handleCloseWidget}
    >
      <IconX className="action-icon" />
    </ActionIcon>
  );
}
