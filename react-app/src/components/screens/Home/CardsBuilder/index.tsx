import { Stack } from "@mantine/core";
import { useConfig } from "../../../../providers/ConfigProvider";
import ButtonCard from "./ButtonCard";
import ImageCard from "./ImageCard";
import LinkCard from "./LinkCard";

export default function HomeCardsBuilder() {
  const { config } = useConfig();

  return (
    <Stack gap="sm" mb="md">
      {config.homeScreenConfig?.additionalCards?.map((card, index) => {
        switch (card.type) {
          case "button":
            return <ButtonCard key={index} config={card.config} idx={index} />;
          case "image":
            return <ImageCard key={index} config={card.config} idx={index} />;
          case "link":
            return <LinkCard key={index} config={card.config} idx={index} />;
          default:
            return null;
        }
      })}
    </Stack>
  );
}
