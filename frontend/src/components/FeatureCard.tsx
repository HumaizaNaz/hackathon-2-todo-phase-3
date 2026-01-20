// frontend/src/components/FeatureCard.tsx

import { ReactNode } from "react";

export default function FeatureCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="neon-card p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-2 text-[color:var(--text-primary)]">{title}</h3>
      <p className="text-[color:var(--text-secondary)]">{description}</p>
    </div>
  );
}