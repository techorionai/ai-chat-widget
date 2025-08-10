export const CHAT_PROVIDER_LIST_SESSIONS_QUERY_KEY = [
  "chatProviderListSessions",
];
export const CHAT_PROVIDER_SESSION_MESSAGES_QUERY_KEY = (sessionId: string) => [
  "chatProviderSessionMessages",
  sessionId,
];
