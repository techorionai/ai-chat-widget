import {
  ActionIcon,
  ActionIconProps,
  ThemeIcon,
  ThemeIconProps,
} from "@mantine/core";
import { useEffect, useState } from "react";

export interface IconProps {
  /**
   * Tabler icon name or full URL
   *
   * Example:
   *
   * Tabler icon Outline:  "outline/battery"
   *
   * Tabler icon Filled:   "filled/battery"
   *
   * Full URL:       "https://example.com/my-icon.svg"
   */
  icon: string;

  /** Icon type. Can be "theme" or "action" */
  iconType?: "theme" | "action";

  /** If button, then allow type */
  type?: "button" | "submit" | "reset" | undefined;
}

export default function Icon({
  icon,
  iconType = "theme",
  children,
  type,
  ...props
}: IconProps & (ThemeIconProps | ActionIconProps)) {
  const getFullIconUrl = (icon: string) => {
    if (icon.startsWith("http://") || icon.startsWith("https://")) {
      return icon;
    }

    return `https://assets.navigable.ai/icons/${icon}.svg`;
  };

  const src = getFullIconUrl(icon);

  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((rawSvg) => {
        let cleaned = rawSvg
          // remove width/height attributes
          .replace(/(width|height)="[^"]*"/g, "")
          // force responsive sizing
          .replace("<svg", '<svg width="100%" height="100%"')
          .replace(/stroke-width="[^"]*"/g, "")
          .replace("<svg", '<svg stroke-width="2"')
          .replace(/\bstroke="[^"]*"/g, 'stroke="currentColor"');

        setSvg(cleaned);
      });
  }, [src]);

  if (src.endsWith(".svg")) {
    if (iconType === "theme") {
      return (
        <ThemeIcon
          dangerouslySetInnerHTML={{ __html: svg || "" }}
          {...(props as ThemeIconProps)}
        />
      );
    } else if (iconType === "action") {
      return (
        <ActionIcon {...(props as ActionIconProps)} type={type}>
          <span
            dangerouslySetInnerHTML={{ __html: svg || "" }}
            style={{
              display: "inline-block",
              width: "75%",
              height: "75%",
              stroke: "currentcolor",
            }}
          />
        </ActionIcon>
      );
    }
  }

  return <img width="100%" height="auto" src={src} alt="Icon" />;
}
