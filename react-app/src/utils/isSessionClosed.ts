import { useQueryClient } from "@tanstack/react-query";
import { CHAT_PROVIDER_LIST_SESSIONS_QUERY_KEY } from "../consts/queryKeys";
import { DataOrError, ChatProviderSession } from "../types/mainProcess";

const isSessionClosed = (sessionId: string): boolean => {
  const queryClient = useQueryClient();

  if (sessionId === "new") {
    return false;
  }

  const sessions = queryClient.getQueryData<DataOrError<ChatProviderSession[]>>(
    CHAT_PROVIDER_LIST_SESSIONS_QUERY_KEY
  );

  // An unknown state (no cache, loading, error, or session not in the list)
  // is not a closed session. Only the server flag closes a session.
  if (!sessions || "error" in sessions || "loading" in sessions) {
    return false;
  }

  const session = sessions.data.find((item) => item.id === sessionId);

  return session?.closed === true;
};

export default isSessionClosed;
