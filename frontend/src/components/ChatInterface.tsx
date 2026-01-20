'use client';

import { useState, useRef, useEffect } from 'react';

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

      // Construct the API URL using the environment variable
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${userId}/chat`;

      // Send message to backend using API library
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
    <div
      className="flex flex-col h-full rounded-lg"
      style={{
        backgroundColor: 'var(--bg-card)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Chat header */}
      <div
        className="px-6 py-4 border-b rounded-t-lg"
        style={{
          backgroundColor: 'rgba(255, 0, 255, 0.1)',
          borderColor: 'var(--border-neon)',
        }}
      >
        <h2
          className="text-xl font-semibold neon-text"
          style={{
            color: 'var(--neon-cyan)',
            textShadow: '0 0 8px var(--neon-cyan), 0 0 15px var(--neon-cyan)',
          }}
        >
          AI Task Assistant
        </h2>
        <p
          className="text-sm"
          style={{
            color: 'var(--text-secondary)',
          }}
        >
          Manage your tasks with natural language
        </p>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[500px]">
        {messages.length === 0 ? (
          <div
            className="text-center mt-8"
            style={{
              color: 'var(--text-secondary)',
            }}
          >
            <p>Start a conversation to manage your tasks!</p>
            <p className="mt-2 text-sm">Try saying: "Add a task to buy groceries"</p>
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
                  message.role === 'user' ? 'text-white' : ''
                }`}
                style={{
                  backgroundColor: message.role === 'user'
                    ? 'var(--neon-pink)'
                    : 'rgba(0, 255, 255, 0.1)',
                  color: message.role === 'user'
                    ? 'white'
                    : 'var(--text-primary)',
                  border: message.role === 'user'
                    ? '1px solid var(--neon-pink)'
                    : '1px solid var(--neon-cyan)',
                  boxShadow: message.role === 'user'
                    ? '0 0 10px var(--neon-pink)'
                    : '0 0 10px var(--neon-cyan)',
                }}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div
                  className="text-xs mt-1"
                  style={{
                    color: message.role === 'user'
                      ? 'rgba(255, 255, 255, 0.7)'
                      : 'var(--text-secondary)',
                  }}
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
            <div
              className="rounded-lg px-4 py-2 max-w-[80%]"
              style={{
                backgroundColor: 'rgba(0, 255, 255, 0.1)',
                color: 'var(--text-primary)',
                border: '1px solid var(--neon-cyan)',
                boxShadow: '0 0 10px var(--neon-cyan)',
              }}
            >
              <div>Thinking...</div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div
        className="border-t p-4"
        style={{
          borderColor: 'var(--border-neon)',
        }}
      >
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 rounded-lg px-4 py-2 focus:outline-none"
            style={{
              backgroundColor: 'var(--bg-input)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-neon)',
            }}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            style={{
              backgroundColor: 'var(--neon-cyan)',
              color: 'var(--bg-primary)',
              border: '1px solid var(--neon-cyan)',
              boxShadow: '0 0 10px var(--neon-cyan)',
            }}
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