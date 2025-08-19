import { ActionIcon } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import sendEventToMain from "../../../../../utils/sendEvent";

export default function HomeHeaderCloseButton() {
  const handleCloseWidget = () => {
    sendEventToMain("closeWidget");
  };

  return (
    <ActionIcon variant="transparent" color="gray" onClick={handleCloseWidget}>
      <IconX className="action-icon" />
    </ActionIcon>
  );
}
