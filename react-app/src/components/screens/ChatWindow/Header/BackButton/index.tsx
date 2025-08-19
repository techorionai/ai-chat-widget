import { ActionIcon } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import useConfigColors from "../../../../../hooks/useConfigColors";

export default function ChatWindowHeaderBackButton() {
  const { headerColor } = useConfigColors();
  const navigate = useNavigate();

  return (
    <ActionIcon
      variant="subtle"
      color={headerColor ?? "gray"}
      onClick={() => navigate(-1)}
    >
      <IconChevronLeft className="action-icon" />
    </ActionIcon>
  );
}
