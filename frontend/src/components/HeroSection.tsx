// frontend/src/components/HeroSection.tsx

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { MoveRight } from 'lucide-react';

export default function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="text-center py-20 md:py-32">
      <h1 className="text-5xl md:text-7xl font-bold neon-text-gradient mb-6">
        Zaura
      </h1>
      <p className="text-xl md:text-2xl text-[color:var(--text-secondary)] max-w-3xl mx-auto mb-4">
        Simplify Your Workflow with Zaura
      </p>
      <p className="text-lg md:text-xl text-[color:var(--text-tertiary)] max-w-2xl mx-auto mb-10">
        Zaura helps you plan, organize, and execute faster
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {isAuthenticated ? (
          <Link href="/dashboard" className="neon-button-primary text-lg px-8 py-4">
            Go to Dashboard <MoveRight className="ml-2" />
          </Link>
        ) : (
          <>
            <Link href="/signup" className="neon-button-primary text-lg px-8 py-4">
              Get Started <MoveRight className="ml-2" />
            </Link>
            <Link href="/login" className="neon-button-secondary text-lg px-8 py-4">
              Login
            </Link>
          </>
        )}
      </div>
      {/* Video Placeholder */}
      
      {/* Stats Section */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--neon-cyan)] to-[color:var(--neon-purple)]">7k+</div>
          <div className="text-sm md:text-base text-[color:var(--text-secondary)]">Users</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--neon-purple)] to-[color:var(--neon-pink)]">50+</div>
          <div className="text-sm md:text-base text-[color:var(--text-secondary)]">Features</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--neon-pink)] to-[color:var(--neon-yellow)]">95%</div>
          <div className="text-sm md:text-base text-[color:var(--text-secondary)]">Satisfaction</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--neon-cyan)] to-[color:var(--neon-pink)]">10+</div>
          <div className="text-sm md:text-base text-[color:var(--text-secondary)]">Countries</div>
        </div>
      </div>
    </section>
  );
}