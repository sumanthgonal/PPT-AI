import { ChatSession, Message } from "@/types";

const STORAGE_KEY = "ai-chat-sessions";
const CURRENT_SESSION_KEY = "ai-chat-current-session";

export function saveSession(session: ChatSession): void {
  try {
    const sessions = getSessions();
    const existingIndex = sessions.findIndex((s) => s.id === session.id);

    if (existingIndex >= 0) {
      sessions[existingIndex] = session;
    } else {
      sessions.push(session);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    localStorage.setItem(CURRENT_SESSION_KEY, session.id);
  } catch (error) {
    console.error("Error saving session:", error);
  }
}

export function getSessions(): ChatSession[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const sessions = JSON.parse(data);
    // Convert date strings back to Date objects
    return sessions.map((session: any) => ({
      ...session,
      createdAt: new Date(session.createdAt),
      updatedAt: new Date(session.updatedAt),
      messages: session.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      })),
    }));
  } catch (error) {
    console.error("Error getting sessions:", error);
    return [];
  }
}

export function getCurrentSessionId(): string | null {
  try {
    return localStorage.getItem(CURRENT_SESSION_KEY);
  } catch (error) {
    console.error("Error getting current session ID:", error);
    return null;
  }
}

export function getCurrentSession(): ChatSession | null {
  try {
    const sessionId = getCurrentSessionId();
    if (!sessionId) return null;

    const sessions = getSessions();
    return sessions.find((s) => s.id === sessionId) || null;
  } catch (error) {
    console.error("Error getting current session:", error);
    return null;
  }
}

export function createNewSession(): ChatSession {
  const session: ChatSession = {
    id: `session-${Date.now()}`,
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  saveSession(session);
  return session;
}

export function deleteSession(sessionId: string): void {
  try {
    const sessions = getSessions();
    const filtered = sessions.filter((s) => s.id !== sessionId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

    if (getCurrentSessionId() === sessionId) {
      localStorage.removeItem(CURRENT_SESSION_KEY);
    }
  } catch (error) {
    console.error("Error deleting session:", error);
  }
}
