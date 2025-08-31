import { Box, Group, LoadingOverlay, Paper, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router";
import { useMainEventListener } from "../../../../hooks/useMainEventListener";
import { useConfig } from "../../../../providers/ConfigProvider";
import { DataOrError } from "../../../../types/mainProcess";
import sendEventToMain from "../../../../utils/sendEvent";
import Icon from "../../../Icon";

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
          <Box maw="calc(100% - 2.75rem)">
            <Text fz="sm" fw="bold">
              {config.homeScreenConfig?.sendUsAMessageConfig?.title ??
                "Send us a message"}
            </Text>
            <Text fz="sm">
              {config.homeScreenConfig?.sendUsAMessageConfig?.description ??
                "Get instant support with AI assistance"}
            </Text>
          </Box>
          <Icon icon="outline/send-2" variant="transparent" />
        </Group>
      </Paper>
    </Box>
  );
}
