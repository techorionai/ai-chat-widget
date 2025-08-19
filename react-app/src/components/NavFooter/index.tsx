import { Box, Group, Paper, Text, ThemeIcon } from "@mantine/core";
import { IconHome2, IconMessageChatbot } from "@tabler/icons-react";
import { NavLink, useLocation } from "react-router";
import useConfigColors from "../../hooks/useConfigColors";

export const NavFooterHeight = 101;

export default function NavFooter() {
  const location = useLocation();
  const { primaryColor } = useConfigColors();

  const isHomeActive = location.pathname === "/";
  const isSessionsActive = location.pathname === "/sessions";

  return (
    <Paper
      shadow="md"
      withBorder
      py="md"
      px="xl"
      pos="fixed"
      radius="0px"
      bottom={0}
      left={0}
      right={0}
      style={{ borderLeft: "none", borderRight: "none", borderBottom: "none" }}
    >
      <Group justify="center" gap="7rem">
        <NavLink to="/">
          <Box ta="center">
            <ThemeIcon
              variant="white"
              color={isHomeActive ? undefined : "gray"}
              size="xl"
            >
              <IconHome2 size="70%" />
            </ThemeIcon>
            <Text fw="bold" fz="sm" c={isHomeActive ? primaryColor : "gray"}>
              Home
            </Text>
          </Box>
        </NavLink>
        <NavLink to="/sessions">
          <Box ta="center">
            <ThemeIcon
              variant="white"
              color={isSessionsActive ? undefined : "gray"}
              size="xl"
            >
              <IconMessageChatbot size="70%" />
            </ThemeIcon>
            <Text
              fw="bold"
              fz="sm"
              c={isSessionsActive ? primaryColor : "gray"}
            >
              Messages
            </Text>
          </Box>
        </NavLink>
      </Group>
    </Paper>
  );
}
