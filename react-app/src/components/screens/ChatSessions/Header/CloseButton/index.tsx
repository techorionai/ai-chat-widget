import { ActionIcon } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import useConfigColors from "../../../../../hooks/useConfigColors";
import sendEventToMain from "../../../../../utils/sendEvent";

export default function ChatSessionsHeaderCloseButton() {
  const { headerColor } = useConfigColors();

  const handleCloseWidget = () => {
    sendEventToMain("closeWidget");
  };

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
