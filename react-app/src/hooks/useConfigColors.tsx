import { useMantineColorScheme } from "@mantine/core";
import { useConfig } from "../providers/ConfigProvider";
import { useEffect, useState } from "react";

export default function useConfigColors() {
  const { config } = useConfig();
  const { colorScheme } = useMantineColorScheme();

  const [bg, setBg] = useState<string | undefined>("white");
  const [color, setColor] = useState<string | undefined>("black");
  const [headerBg, setHeaderBg] = useState<string | undefined>("white");
  const [headerColor, setHeaderColor] = useState<string | undefined>("black");
  const [borderColor, setBorderColor] = useState<string | undefined>(
    "rgba(245, 245, 245, 1)"
  );

  useEffect(() => {
    getBg();
    getColor();
    getHeaderBg();
    getHeaderColor();
    getBorderColor();
  }, [config, colorScheme]);

  const getBg = () => {
    const bg =
      colorScheme === "light"
        ? config.chatWindow?.defaults?.colors?.light?.bg || "white"
        : config.chatWindow?.defaults?.colors?.dark?.bg || "dark";
    setBg(bg);
    return bg;
  };

  const getColor = () => {
    const color =
      colorScheme === "light"
        ? config.chatWindow?.defaults?.colors?.light?.color || "black"
        : config.chatWindow?.defaults?.colors?.dark?.color || "white";
    setColor(color);
    return color;
  };

  const getHeaderBg = () => {
    const headerBg = config.chatWindow?.header?.bg || getBg();
    setHeaderBg(headerBg);
    return headerBg;
  };

  const getHeaderColor = () => {
    const headerColor = config.chatWindow?.header?.color || getColor();
    setHeaderColor(headerColor);
    return headerColor;
  };

  const getBorderColor = () => {
    const borderColor =
      colorScheme === "light"
        ? "rgba(245, 245, 245, 1)"
        : "rgba(245, 245, 245, 0.25)";
    setBorderColor(borderColor);
    return borderColor;
  };

  return {
    bg,
    color,
    headerBg,
    headerColor,
    borderColor,
    colorScheme,
  };
}
