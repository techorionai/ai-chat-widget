import { Image } from "@mantine/core";
import { useConfig } from "../../../../../providers/ConfigProvider";
import logToIframe from "../../../../../utils/logger";
import useConfigColors from "../../../../../hooks/useConfigColors";

export default function HomeHeaderLogo() {
  const { config } = useConfig();
  const { colorScheme } = useConfigColors();
  logToIframe(
    `HomeHeaderLogo config: ${JSON.stringify(config.homeScreenConfig)}`
  );
  if (
    !config.homeScreenConfig?.logoUrl ||
    config.homeScreenConfig.logoUrl.trim()?.length === 0
  ) {
    return null;
  }

  let logoUrl = config.homeScreenConfig.logoUrl;
  if (
    colorScheme === "dark" &&
    config.homeScreenConfig?.logoUrlDark &&
    config.homeScreenConfig?.logoUrlDark?.length > 0
  ) {
    logoUrl = config.homeScreenConfig.logoUrlDark;
  }

  return (
    <Image src={logoUrl} alt="Logo" height={38} width="auto" radius="sm" />
  );
}
