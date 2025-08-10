import { ActionIcon } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import useConfigColors from "../../../../../hooks/useConfigColors";
import { useConfig } from "../../../../../providers/ConfigProvider";
import { useNavigate } from "react-router";

export default function ChatWindowHeaderBackToSessionsListButton() {
  const { config } = useConfig();
  const { headerColor } = useConfigColors();
  const navigate = useNavigate();

  if (!config.chatProvider?.multiSession) {
    return null;
  }

  return (
    <ActionIcon
      variant="subtle"
      color={headerColor ?? "gray"}
      onClick={() => navigate("/sessions")}
    >
      <IconChevronLeft className="action-icon" />
    </ActionIcon>
  );
}
