import { Route, Routes } from "react-router";
import { useConfig } from "../../providers/ConfigProvider";
import InvalidConfig from "../InvalidConfig";
import ChatWindow from "../screens/ChatWindow";
import ChatSessions from "../screens/ChatSessions";
import Home from "../screens/Home";

export default function RoutesBuilder() {
  const { config } = useConfig();

  if (!config.chatProvider) {
    return (
      <InvalidConfig reason="Chat provider is not configured. Please check your configuration." />
    );
  }

  if (config.chatProvider.multiSession) {
    return (
      <Routes>
        <Route index element={<Home />} />
        <Route path="sessions">
          <Route index element={<ChatSessions />} />
          <Route path=":sessionId" element={<ChatWindow />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route index element={<ChatWindow />} />
    </Routes>
  );
}
