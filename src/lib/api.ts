const RAW_BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000";

const BACKEND_URL = RAW_BACKEND_URL.replace(/\/$/, "");

type BackendErrorResponse = {
  error?: string;
  message?: string;
};

type ChatResponse = {
  response?: string;
  error?: string;
  message?: string;
};

type ChatListResponse = {
  chats?: ChatSummary[];
  error?: string;
  message?: string;
};

type ChatMessagesResponse = {
  messages?: ChatMessage[];
  error?: string;
  message?: string;
};

export type SendChatPayload = {
  userId: string;
  chatId: string;
  query: string;
};

export type ChatSummary = {
  chat_id: string;
  title: string;
  created_at: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "ai";
  content: string;
  created_at?: string;
};

async function parseError(res: Response): Promise<string> {
  let err: BackendErrorResponse | null = null;
  try {
    err = (await res.json()) as BackendErrorResponse;
  } catch {
    err = null;
  }

  return err?.message || err?.error || `Request failed with status ${res.status}`;
}

export async function sendChatMessage(payload: SendChatPayload): Promise<string> {
  const shouldSendCredentials =
    typeof window !== "undefined" && window.location.origin === BACKEND_URL;

  let res: Response;
  try {
    res = await fetch(`${BACKEND_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Avoid cross-origin credentialed requests by default to prevent CORS failures.
      credentials: shouldSendCredentials ? "include" : "omit",
      body: JSON.stringify({
        user_id: payload.userId,
        chat_id: payload.chatId,
        query: payload.query,
      }),
    });
  } catch (error) {
    const reason =
      error instanceof Error && error.message
        ? error.message
        : "Network request failed";
    throw new Error(`Failed to reach backend at ${BACKEND_URL}: ${reason}`);
  }

  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  const data = (await res.json()) as ChatResponse;
  if (!data.response) {
    throw new Error(data.message || data.error || "Empty response from backend");
  }

  return data.response;
}

export async function fetchUserChats(userId: string): Promise<ChatSummary[]> {
  const res = await fetch(`${BACKEND_URL}/chats/${encodeURIComponent(userId)}`, {
    method: "GET",
    credentials: "omit",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  const data = (await res.json()) as ChatListResponse;
  return data.chats ?? [];
}

export async function fetchChatMessages(userId: string, chatId: string): Promise<ChatMessage[]> {
  const res = await fetch(
    `${BACKEND_URL}/chats/${encodeURIComponent(userId)}/${encodeURIComponent(chatId)}/messages`,
    {
      method: "GET",
      credentials: "omit",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  const data = (await res.json()) as ChatMessagesResponse;
  return data.messages ?? [];
}