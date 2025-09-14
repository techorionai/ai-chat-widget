import { Container } from "@mantine/core";

import { useForm } from "@mantine/form";
import { useParams } from "react-router";
import useConfigColors from "../../../hooks/useConfigColors";
import { useMainEventListener } from "../../../hooks/useMainEventListener";
import {
  ChatProviderListSessionMessagesMessage,
  DataOrError,
} from "../../../types/mainProcess";
import sendEventToMain from "../../../utils/sendEvent";
import ChatWindowHeader from "./Header";
import ChatWindowMessageBox from "./MessageBox";
import ChatWindowMessages from "./Messages";
import { useQueryClient } from "@tanstack/react-query";
import { CHAT_PROVIDER_SESSION_MESSAGES_QUERY_KEY } from "../../../consts/queryKeys";

export default function ChatWindow() {
  const queryClient = useQueryClient();
  const { sessionId } = useParams();
  const { bg, color } = useConfigColors();
  const form = useForm({
    initialValues: {
      isResponding: false,
      message: "",
      error: null as string | null,
    },
  });

  const onMessageSubmit = (message: string) => {
    if (form.values.isResponding) return;
    form.setValues({ isResponding: true, message });
  };

  useMainEventListener({
    chatProviderSendMessage: async (
      data: DataOrError<ChatProviderListSessionMessagesMessage>
    ) => {
      if ("error" in data) {
        form.setValues({ isResponding: false, error: data.error });
      } else if ("data" in data) {
        if (sessionId && sessionId !== "new") {
          // Update the query cache directly
          const queryKey = CHAT_PROVIDER_SESSION_MESSAGES_QUERY_KEY(sessionId);

          // Let's get the data first
          const existingData =
            queryClient.getQueryData<
              DataOrError<ChatProviderListSessionMessagesMessage[]>
            >(queryKey);

          // Append the user and ai messages to the existing data
          if (existingData && "data" in existingData) {
            const newData = [...existingData.data, data.data];
            queryClient.setQueryData(queryKey, {
              ...existingData,
              data: newData,
            });
          }
        } else {
          sendEventToMain("chatProviderListSessionMessages", {
            sessionId: sessionId || "new",
          });
        }
        form.setValues({ isResponding: false, message: "", error: null });
      }
    },
  });

  return (
    <Container fluid bg={bg} c={color} h="100vh" p={0}>
      <ChatWindowHeader />
      <ChatWindowMessages
        isResponding={form.values.isResponding}
        respondingMessage={form.values.message}
        respondingError={form.values.error}
      />
      <ChatWindowMessageBox onMessageSubmit={onMessageSubmit} />
    </Container>
  );
}
