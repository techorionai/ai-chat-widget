import "@mantine/core/styles.css";
import "./App.css";

import { MantineProvider } from "@mantine/core";

import RoutesBuilder from "./components/RoutesBuilder";
import { ConfigProvider } from "./providers/ConfigProvider";
import { EventHandlerProvider } from "./providers/EventHandlerProvider";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <ConfigProvider>
        <QueryClientProvider client={queryClient}>
          <EventHandlerProvider>
            <AppContent />
          </EventHandlerProvider>
        </QueryClientProvider>
      </ConfigProvider>
    </MantineProvider>
  );
}

function AppContent() {
  return <RoutesBuilder />;
}
