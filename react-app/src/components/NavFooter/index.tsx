import { Box, Group, Paper, Text } from "@mantine/core";
import { NavLink, useLocation } from "react-router";

import useConfigColors from "../../hooks/useConfigColors";
import { useConfig } from "../../providers/ConfigProvider";
import Icon from "../Icon";

export const NavFooterHeight = 89;

export default function NavFooter() {
  const location = useLocation();
  const { config } = useConfig();
  const { primaryColor } = useConfigColors();

  const isHomeActive = location.pathname === "/";
  const isSessionsActive = location.pathname === "/sessions";

  return (
    <Paper
      shadow="md"
      withBorder
      py="xs"
      px="xl"
      pos="fixed"
      radius="0px"
      bottom={0}
      left={0}
      right={0}
      style={{ borderLeft: "none", borderRight: "none", borderBottom: "none" }}
      {...config.footerConfig?.containerProps}
    >
      <Group justify="center" gap="7rem" pos="relative" top="-4px">
        <NavLink to="/">
          <Box ta="center">
            <Icon
              icon={config.footerConfig?.home?.altIcon || "outline/home"}
              variant="transparent"
              color={isHomeActive ? undefined : "gray"}
              size="2.5rem"
              pos="relative"
              top="8px"
              {...config.footerConfig?.home?.iconProps}
            />
            <Text
              fw="bold"
              fz="sm"
              c={isHomeActive ? primaryColor : "gray"}
              {...config.footerConfig?.home?.props}
            >
              {config.footerConfig?.home?.text || "Home"}
            </Text>
          </Box>
        </NavLink>
        <NavLink to="/sessions">
          <Box ta="center">
            <Icon
              icon={
                config.footerConfig?.messages?.altIcon ||
                "outline/message-chatbot"
              }
              variant="transparent"
              color={isSessionsActive ? undefined : "gray"}
              size="2.5rem"
              pos="relative"
              top="8px"
              {...config.footerConfig?.messages?.iconProps}
            />
            <Text
              fw="bold"
              fz="sm"
              c={isSessionsActive ? primaryColor : "gray"}
              {...config.footerConfig?.messages?.props}
            >
              {config.footerConfig?.messages?.text || "Messages"}
            </Text>
          </Box>
        </NavLink>
      </Group>
    </Paper>
  );
}
