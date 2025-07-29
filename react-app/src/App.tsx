import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router";

import ChatWindow from "./components/screens/ChatWindow";
import { ConfigProvider } from "./providers/ConfigProvider";
import { EventHandlerProvider } from "./providers/EventHandlerProvider";
import { theme } from "./theme";

export default function App() {
  return (
    <ConfigProvider>
      <EventHandlerProvider>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <AppContent />
        </MantineProvider>
      </EventHandlerProvider>
    </ConfigProvider>
  );
}

function AppContent() {
  return (
    <Routes>
      <Route index element={<ChatWindow />} />
    </Routes>
  );
}
