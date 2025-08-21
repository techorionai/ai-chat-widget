import { ActionIcon } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import sendEventToMain from "../../../../../utils/sendEvent";

export default function HomeHeaderCloseButton() {
  const handleCloseWidget = () => {
    sendEventToMain("closeWidget");
  };

  return (
    <ActionIcon
      pos="fixed"
      top="2.25rem"
      right="2.25rem"
      variant="subtle"
      color="gray"
      onClick={handleCloseWidget}
    >
      <IconX className="action-icon" />
    </ActionIcon>
  );
}
