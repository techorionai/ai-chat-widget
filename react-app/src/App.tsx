import "@mantine/core/styles.css";
import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RoutesBuilder from "./components/RoutesBuilder";
import { ConfigProvider } from "./providers/ConfigProvider";
import { EventHandlerProvider } from "./providers/EventHandlerProvider";
import MantineWrapperProvider from "./providers/MantineWrapperProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <ConfigProvider>
      <MantineWrapperProvider>
        <QueryClientProvider client={queryClient}>
          <EventHandlerProvider>
            <AppContent />
          </EventHandlerProvider>
        </QueryClientProvider>
      </MantineWrapperProvider>
    </ConfigProvider>
  );
}

function AppContent() {
  return <RoutesBuilder />;
}
