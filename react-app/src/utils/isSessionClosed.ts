import { useQueryClient } from "@tanstack/react-query";
import { CHAT_PROVIDER_LIST_SESSIONS_QUERY_KEY } from "../consts/queryKeys";
import { DataOrError, ChatProviderSession } from "../types/mainProcess";

const isSessionClosed = (sessionId: string): boolean => {
  if (sessionId === "new") {
    return false;
  }

  const queryClient = useQueryClient();

  const sessions = queryClient.getQueryData<DataOrError<ChatProviderSession[]>>(
    CHAT_PROVIDER_LIST_SESSIONS_QUERY_KEY
  );

  if (!sessions || "error" in sessions || "loading" in sessions) {
    return true;
  }

  const sessionsMap: Record<string, ChatProviderSession> = {};
  sessions.data.forEach((session) => {
    sessionsMap[session.id] = session;
  });

  const session = sessionsMap[sessionId];
  if (!session) {
    return true;
  }

  if (session.closed) {
    return true;
  }

  return false;
};

export default isSessionClosed;
