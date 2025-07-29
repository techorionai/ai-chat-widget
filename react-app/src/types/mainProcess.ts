export type sendMainEventFn = (
  type: EventTypeMain,
  data?: Record<string, any>
) => void;

export type EventTypeMain = "set_config";

export type sendIframeEventFn = (
  type: EventTypeIframe,
  data?: Record<string, any>
) => void;

export type EventTypeIframe = "init" | "LOG";

export type EventHandler = <T extends any>(
  data: MessageEvent<T>["data"]
) => void;

export interface ChatWidgetConfig {
  debug?: boolean;
  chatWindow?: ChatWindowConfig;
}

export interface ChatWindowConfig {
  defaults?: ChatWidgetDefaults;
  header?: ChatWindowHeaderConfig;
}

export interface ChatWindowHeaderConfig {
  avatars?: ChatWidgetHeaderAvatarConfig[];
  maxShownAvatars?: number;
  title?: ChatWidgetHeaderTitleConfig;
  bg?: string;
  color?: string;
}

export interface ChatWidgetHeaderAvatarConfig {
  name?: string;
  url?: string;
}

export interface ChatWidgetHeaderTitleConfig {
  title?: string;
  showOnlineSubtitle?: boolean;
}

export interface ChatWidgetDefaults {
  colors?: ChatWidgetDefaultColors;
}

export interface ChatWidgetDefaultColors {
  light?: ChatWidgetDefaultColorPair;
  dark?: ChatWidgetDefaultColorPair;
}

export interface ChatWidgetDefaultColorPair {
  bg?: string;
  color?: string;
}
