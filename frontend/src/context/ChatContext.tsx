// frontend/src/context/ChatContext.tsx
"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { chatApi } from "../lib/api-client";

interface Message {
  id: number;
  role: string;
  content: string;
  created_at: string;
}

interface Conversation {
  id: number;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface ChatContextType {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  sendMessage: (message: string) => Promise<void>;
  loadConversation: (conversationId: number) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  conversationId: number | null;
  setConversationId: (id: number | null) => void;
  conversations: Conversation[];
  loadConversations: () => Promise<void>;
  activeConversationId: number | null;
  setActiveConversationId: (id: number | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { user, token } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  useEffect(() => {
    if (activeConversationId) {
      loadConversation(activeConversationId);
    } else {
      setMessages([]);
    }
  }, [activeConversationId]);

  const loadConversations = async () => {
    if (!user) return;
    try {
      const convos = await chatApi.getConversations();
      setConversations(convos);
      if (convos.length > 0 && !activeConversationId) {
        setActiveConversationId(convos[0].id);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load conversations");
    }
  };

  const loadConversation = async (conversationId: number) => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const history = await chatApi.getConversationHistory(conversationId);
      setMessages(history);
    } catch (err: any) {
      setError(err.message || "Failed to load conversation");
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (message: string) => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    
    const userMessage: Message = {
      id: Date.now(), // Temporary ID
      role: "user",
      content: message,
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await chatApi.sendMessage(user.id, message, activeConversationId);
      const aiMessage: Message = {
        id: Date.now() + 1, // Temporary ID
        role: "assistant",
        content: response.response,
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMessage]);
      if (!activeConversationId) {
        setActiveConversationId(response.conversation_id);
        loadConversations();
      }
    } catch (err: any) {
      setError(err.message || "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{
      messages,
      setMessages,
      sendMessage,
      loadConversation,
      isLoading,
      error,
      conversationId: activeConversationId,
      setConversationId: setActiveConversationId,
      conversations,
      loadConversations,
      activeConversationId,
      setActiveConversationId
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
