import { ActionIcon } from "@mantine/core";
import {
  IconArrowsDiagonal,
  IconArrowsDiagonalMinimize2,
} from "@tabler/icons-react";
import useConfigColors from "../../../../../hooks/useConfigColors";
import sendEventToMain from "../../../../../utils/sendEvent";
import { useConfig } from "../../../../../providers/ConfigProvider";

export default function ChatWindowHeaderToggleExpandButton() {
  const { config } = useConfig();
  const { headerBg } = useConfigColors();

  const handleToggleExpand = () => {
    sendEventToMain("toggleExpand", {
      expanded: !config.chatWindow?.expanded,
    });
  };

  if (config.chatWindow?.disallowExpand) {
    return null;
  }

  return (
    <ActionIcon
      variant="subtle"
      color={headerBg !== "white" && headerBg !== "black" ? headerBg : "gray"}
      onClick={handleToggleExpand}
    >
      {config.chatWindow?.expanded ? (
        <IconArrowsDiagonalMinimize2 className="action-icon" />
      ) : (
        <IconArrowsDiagonal className="action-icon" />
      )}
    </ActionIcon>
  );
}
