import "@mantine/core/styles.css";

import { MantineProvider, Text, Container } from "@mantine/core";
import { theme } from "./theme";
import { ConfigProvider, useConfig } from "./providers/ConfigProvider";
import { EventHandlerProvider } from "./providers/EventHandlerProvider";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <ConfigProvider>
        <EventHandlerProvider>
          <AppContent />
        </EventHandlerProvider>
      </ConfigProvider>
    </MantineProvider>
  );
}

function AppContent() {
  const { config } = useConfig();
  return (
    <Container>
      <Text size="xl" fw={700} mb="md" variant="gradient">
        Chat Widget Config
      </Text>
      <pre>
        {config ? JSON.stringify(config, null, 2) : "No config received"}
      </pre>
    </Container>
  );
}
