import { Image } from "@mantine/core";
import { useConfig } from "../../../../../providers/ConfigProvider";
import logToIframe from "../../../../../utils/logger";

export default function HomeHeaderLogo() {
  const { config } = useConfig();
  logToIframe(
    `HomeHeaderLogo config: ${JSON.stringify(config.homeScreenConfig)}`
  );
  if (
    !config.homeScreenConfig?.logoUrl ||
    config.homeScreenConfig.logoUrl.trim()?.length === 0
  ) {
    return null;
  }

  return (
    <Image
      src={config.homeScreenConfig?.logoUrl}
      alt="Logo"
      height={38}
      width="auto"
    />
  );
}
