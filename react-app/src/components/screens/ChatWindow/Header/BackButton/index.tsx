import { useNavigate } from "react-router";
import useConfigColors from "../../../../../hooks/useConfigColors";
import Icon from "../../../../Icon";

export default function ChatWindowHeaderBackButton() {
  const { headerColor } = useConfigColors();
  const navigate = useNavigate();

  return (
    <Icon
      icon="outline/chevron-left"
      iconType="action"
      variant="subtle"
      color={headerColor ?? "gray"}
      onClick={() => navigate("/sessions")}
    />
  );
}
