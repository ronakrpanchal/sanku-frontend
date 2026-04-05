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

export type SendChatPayload = {
  userId: string;
  chatId: string;
  query: string;
};

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
    let err: BackendErrorResponse | null = null;
    try {
      err = (await res.json()) as BackendErrorResponse;
    } catch {
      err = null;
    }

    const fallback = `Request failed with status ${res.status}`;
    throw new Error(err?.message || err?.error || fallback);
  }

  const data = (await res.json()) as ChatResponse;
  if (!data.response) {
    throw new Error(data.message || data.error || "Empty response from backend");
  }

  return data.response;
}