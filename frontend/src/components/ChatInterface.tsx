'use client';

import { useState, useRef, useEffect } from 'react';
import { getAuthToken } from '../lib/auth-client';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatInterface = ({ userId }: { userId: string }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Get conversation ID from localStorage
      const storedConversationId = localStorage.getItem('conversation_id');
      
      // Get auth token
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      // Construct the API URL to point to the backend chat endpoint
      const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      const apiUrl = `${backendUrl}/api/${userId}/chat`;

      // Send message to backend using API library
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: inputValue,
          conversation_id: storedConversationId || null,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Store conversation ID for continuity
      if (data.conversation_id) {
        localStorage.setItem('conversation_id', data.conversation_id);
      }

      // Add assistant message
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full rounded-lg bg-[color:var(--bg-card)] text-[color:var(--text-primary)]">
      {/* Chat header */}
     

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[500px]">
        {messages.length === 0 ? (
          <div className="text-center mt-8 text-[color:var(--text-secondary)]">
            <p>Start a conversation to manage your tasks!</p>
            <p className="mt-2 text-sm">Try saying: &quot;Add a task to buy groceries&quot;</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-[color:var(--neon-pink)] text-white border border-[color:var(--neon-pink)]'
                    : 'bg-[color:var(--bg-input)] text-[color:var(--text-primary)] border border-[color:var(--border-neon)]'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div
                  className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-white/70' : 'text-[color:var(--text-secondary)]'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-lg px-4 py-2 max-w-[80%] bg-[color:var(--bg-input)] text-[color:var(--text-primary)] border border-[color:var(--border-neon)]">
              <div>Thinking...</div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-[color:var(--border-neon)] p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 rounded-lg px-4 py-2 focus:outline-none bg-[color:var(--bg-input)] text-[color:var(--text-primary)] border border-[color:var(--border-neon)]"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="neon-button-primary rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !inputValue.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;