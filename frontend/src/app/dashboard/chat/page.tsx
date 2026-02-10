"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useChat } from "../../../context/ChatContext";
import { useRouter } from "next/navigation";

interface Message {
  id: number;
  role: string;
  content: string;
  created_at: string;
}

export default function ChatPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { messages, sendMessage, isLoading, error, activeConversationId, setActiveConversationId, conversations } = useChat();
  const router = useRouter();
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;
    
    const currentInput = inputMessage;
    setInputMessage("");
    await sendMessage(currentInput);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] flex items-center justify-center">
        <div className="text-2xl font-bold text-[color:var(--neon-cyan)] animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[color:var(--neon-cyan)] mb-4 md:mb-0">
          AI Chat Assistant
        </h1>
        <div className="text-left md:text-right">
          <h2 className="text-base md:text-lg font-semibold text-[color:var(--text-primary)]">
            Welcome, {user?.name || user?.email || 'User'}!
          </h2>
          <select
            onChange={(e) => setActiveConversationId(Number(e.target.value))}
            value={activeConversationId || ''}
            className="mt-2 px-3 py-1.5 rounded-lg text-sm bg-[color:var(--bg-input)] border border-[color:var(--border-neon)] text-[color:var(--text-primary)] focus:ring-2 focus:ring-[color:var(--neon-cyan)] focus:border-transparent focus:outline-none cursor-pointer appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 10px center',
              paddingRight: '32px',
            }}
          >
            <option value="">New Conversation</option>
            {conversations.map(convo => (
              <option key={convo.id} value={convo.id}>Conversation {convo.id}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-[color:var(--bg-card)] rounded-lg border border-red-200 dark:border-red-500/50 text-red-600 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Chat Container */}
      <div className="flex flex-col h-[calc(100vh-220px)] bg-[color:var(--bg-card)] rounded-lg border border-[color:var(--border-neon)] shadow-[0_0_15px_rgba(255,0,255,0.2)]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && !isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-[color:var(--neon-cyan)] mb-2">
                Welcome to your AI Assistant!
              </h3>
              <p className="text-[color:var(--text-secondary)] max-w-md">
                I can help you manage your tasks using natural language. Try saying things like:
              </p>
              <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-[color:var(--text-secondary)]">
                <li className="bg-[color:var(--bg-primary)]/50 p-2 rounded">&quot;Add a task to buy groceries&quot;</li>
                <li className="bg-[color:var(--bg-primary)]/50 p-2 rounded">&quot;Show me my tasks&quot;</li>
                <li className="bg-[color:var(--bg-primary)]/50 p-2 rounded">&quot;Mark task 1 as complete&quot;</li>
                <li className="bg-[color:var(--bg-primary)]/50 p-2 rounded">&quot;Delete the meeting task&quot;</li>
              </ul>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    msg.role === "user"
                      ? "bg-[color:var(--neon-cyan)]/20 border border-[color:var(--neon-cyan)]/50 text-[color:var(--text-primary)]"
                      : "bg-[color:var(--bg-primary)] border border-[color:var(--border-neon)] text-[color:var(--text-primary)]"
                  }`}
                >
                  <div className="font-medium mb-1">
                    {msg.role === "user" ? "You" : "AI Assistant"}
                  </div>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-4 bg-[color:var(--bg-primary)] border border-[color:var(--border-neon)] text-[color:var(--text-primary)]">
                <div className="font-medium mb-1">AI Assistant</div>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-[color:var(--neon-cyan)] animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-[color:var(--neon-cyan)] animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-[color:var(--neon-cyan)] animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-[color:var(--border-neon)] p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 p-3 rounded-lg bg-[color:var(--bg-input)] border border-[color:var(--border-neon)] focus:ring-2 focus:ring-[color:var(--neon-cyan)] focus:border-transparent text-[color:var(--text-primary)] placeholder-[color:var(--text-secondary)]"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="neon-button-primary px-6 py-3 whitespace-nowrap"
              disabled={isLoading || !inputMessage.trim()}
            >
              Send
            </button>
          </form>
          <p className="text-xs text-[color:var(--text-secondary)] mt-2 text-center">
            Ask me to add, list, update, or delete tasks using natural language
          </p>
        </div>
      </div>
    </div>
  );
}