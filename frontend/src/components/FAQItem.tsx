// frontend/src/components/FAQItem.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[color:var(--border-neon)] py-4 transition-all duration-300">
      <button
        className="w-full flex justify-between items-center text-left hover:opacity-80 transition-opacity duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-[color:var(--text-primary)]">{question}</span>
        <ChevronDown
          className={`transform transition-transform duration-300 text-[color:var(--neon-pink)] ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="mt-4 text-[color:var(--text-secondary)] animate-fadeIn">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}