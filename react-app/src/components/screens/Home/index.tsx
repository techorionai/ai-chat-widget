import { Container } from "@mantine/core";
import NavFooter from "../../NavFooter";
import HomeHeader from "./Header";
import useConfigColors from "../../../hooks/useConfigColors";
import HomeHeadings from "./Headings";

export default function Home() {
  const { gradientColor } = useConfigColors();

  return (
    <Container
      fluid
      h="100vh"
      p="xl"
      style={{
        background: gradientColor,
      }}
    >
      <HomeHeader />
      <HomeHeadings />
      <NavFooter />
    </Container>
  );
}
