"use client";

import { useState, useEffect, useRef } from "react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import PresentationPreview from "@/components/PresentationPreview";
import Sidebar from "@/components/Sidebar";
import { Message, PresentationData, ChatSession } from "@/types";
import { generateId } from "@/utils/helpers";
import {
  saveSession,
  getSessions,
  getCurrentSession,
  createNewSession,
  deleteSession,
} from "@/utils/storage";
import { generatePowerPoint } from "@/services/pptService";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPresentation, setCurrentPresentation] =
    useState<PresentationData | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load initial session
  useEffect(() => {
    const loadedSessions = getSessions();
    setSessions(loadedSessions);

    const currentSession = getCurrentSession();
    if (currentSession) {
      setCurrentSessionId(currentSession.id);
      setMessages(currentSession.messages);

      // Find the last presentation in messages
      for (let i = currentSession.messages.length - 1; i >= 0; i--) {
        if (currentSession.messages[i].presentationData) {
          setCurrentPresentation(
            currentSession.messages[i].presentationData!
          );
          break;
        }
      }
    } else {
      // Create new session if none exists
      const newSession = createNewSession();
      setCurrentSessionId(newSession.id);
      setSessions([newSession]);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save session whenever messages change
  useEffect(() => {
    if (currentSessionId && messages.length > 0) {
      const allSessions = getSessions();
      const session: ChatSession = {
        id: currentSessionId,
        messages,
        createdAt:
          allSessions.find((s) => s.id === currentSessionId)?.createdAt ||
          new Date(),
        updatedAt: new Date(),
      };
      saveSession(session);
      setSessions(getSessions());
    }
  }, [messages, currentSessionId]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Build conversation history
      const conversationHistory = messages
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n");

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: content,
          currentPresentation,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: currentPresentation
          ? `I've updated your presentation based on your request.`
          : `I've created a presentation titled "${data.presentationData.title}" with ${data.presentationData.slides.length} slides.`,
        timestamp: new Date(),
        presentationData: data.presentationData,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setCurrentPresentation(data.presentationData);
    } catch (error) {
      console.error("Error sending message:", error);

      const errorMessage: Message = {
        id: generateId(),
        role: "assistant",
        content:
          "Sorry, I encountered an error processing your request. Please make sure your Gemini API key is configured correctly.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPresentation = async () => {
    if (!currentPresentation) return;

    try {
      const pptx = generatePowerPoint(currentPresentation);
      await pptx.writeFile({
        fileName: `${currentPresentation.title.replace(/[^a-z0-9]/gi, "_")}.pptx`,
      });
    } catch (error) {
      console.error("Error downloading presentation:", error);
      alert("Failed to download presentation. Please try again.");
    }
  };

  const handleNewChat = () => {
    const newSession = createNewSession();
    setCurrentSessionId(newSession.id);
    setMessages([]);
    setCurrentPresentation(null);
    setSessions(getSessions());
  };

  const handleSelectSession = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      setMessages(session.messages);

      // Find the last presentation
      for (let i = session.messages.length - 1; i >= 0; i--) {
        if (session.messages[i].presentationData) {
          setCurrentPresentation(session.messages[i].presentationData!);
          break;
        }
      }

      if (!session.messages.some((msg) => msg.presentationData)) {
        setCurrentPresentation(null);
      }
    }
  };

  const handleDeleteSession = (sessionId: string) => {
    deleteSession(sessionId);
    setSessions(getSessions());

    if (currentSessionId === sessionId) {
      handleNewChat();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
        onDeleteSession={handleDeleteSession}
      />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Chat Section */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
          {/* Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Chat PPT Generator
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create and edit presentations with AI
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-md">
                  <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Welcome to AI Chat PPT Generator
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Start a conversation to create a PowerPoint presentation.
                    Just describe what you want to present, and I&apos;ll generate
                    slides for you!
                  </p>
                  <div className="text-left bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Example prompts:
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Create a presentation about climate change</li>
                      <li>• Make slides for a product launch</li>
                      <li>• Generate a business proposal presentation</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Generating...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <ChatInput onSend={handleSendMessage} disabled={isLoading} />
        </div>

        {/* Presentation Preview Section */}
        {currentPresentation && (
          <div className="lg:w-1/2 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700">
            <PresentationPreview
              presentation={currentPresentation}
              onDownload={handleDownloadPresentation}
            />
          </div>
        )}
      </div>
    </div>
  );
}
