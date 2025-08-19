import {
  Box,
  Group,
  LoadingOverlay,
  Paper,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { useConfig } from "../../../../providers/ConfigProvider";
import { Link, useNavigate } from "react-router";
import { IconSend2 } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useMainEventListener } from "../../../../hooks/useMainEventListener";
import { DataOrError } from "../../../../types/mainProcess";
import sendEventToMain from "../../../../utils/sendEvent";

export default function SendUsAMessageCard() {
  const { config } = useConfig();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      newSessionError: null as string | null,
      newSessionLoading: false,
    },
  });

  useMainEventListener({
    chatProviderCreateSession: (data: DataOrError<string>) => {
      if ("error" in data) {
        form.setValues({
          newSessionLoading: false,
          newSessionError: data.error,
        });
      } else if ("data" in data) {
        setTimeout(() => {
          if (data.data !== "new") {
            sendEventToMain("chatProviderListSessions", { newSession: true });
          }
          form.setValues({ newSessionLoading: false, newSessionError: null });
          navigate(`/sessions/${data.data}`);
        }, 500);
      }
    },
  });

  const onCreateSession = () => {
    if (form.values.newSessionLoading) return;
    form.setValues({ newSessionLoading: true, newSessionError: null });
    sendEventToMain("chatProviderCreateSession");
  };

  if (config.homeScreenConfig?.sendUsAMessageConfig?.hidden) {
    return null;
  }

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={form.values.newSessionLoading}
        zIndex={1000}
        overlayProps={{ radius: "md", blur: 2 }}
      />
      <Paper
        shadow="xs"
        p="sm"
        radius="md"
        className="cursor-pointer"
        onClick={onCreateSession}
      >
        <Group justify="space-between" align="center">
          <Box>
            <Text fz="sm" fw="bold">
              {config.homeScreenConfig?.sendUsAMessageConfig?.title ??
                "Send us a message"}
            </Text>
            <Text fz="sm">
              {config.homeScreenConfig?.sendUsAMessageConfig?.description ??
                "Get instant support from our AI assistant."}
            </Text>
          </Box>
          <ThemeIcon variant="transparent">
            <IconSend2 />
          </ThemeIcon>
        </Group>
      </Paper>
    </Box>
  );
}
