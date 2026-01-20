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
    <div className="flex min-h-screen w-full bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] relative overflow-hidden">
      {/* Animated Blob Background */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="blob-c">
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto p-4 md:p-6 relative z-10">
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
              <select onChange={(e) => setActiveConversationId(Number(e.target.value))} value={activeConversationId || ''}>
                <option value="">New Conversation</option>
                {conversations.map(convo => (
                  <option key={convo.id} value={convo.id}>Conversation {convo.id}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-[color:var(--bg-card)] rounded-lg border border-red-500/50 shadow-[0_0_15px_rgba(255,0,0,0.2)] text-red-300">
              {error}
            </div>
          )}

          {/* Chat Container */}
          <div className="flex flex-col h-[calc(100vh-200px)] bg-[color:var(--bg-card)] rounded-lg border border-[color:var(--border-neon)] shadow-[0_0_15px_rgba(255,0,255,0.2)]">
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
                    <li className="bg-[color:var(--bg-primary)]/50 p-2 rounded">"Add a task to buy groceries"</li>
                    <li className="bg-[color:var(--bg-primary)]/50 p-2 rounded">"Show me my tasks"</li>
                    <li className="bg-[color:var(--bg-primary)]/50 p-2 rounded">"Mark task 1 as complete"</li>
                    <li className="bg-[color:var(--bg-primary)]/50 p-2 rounded">"Delete the meeting task"</li>
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
      </main>
    </div>
  );
}