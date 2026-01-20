// frontend/src/app/page.tsx
"use client";

import Link from "next/link";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import MockupsSection from "../components/MockupsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQSection from "../components/FAQSection";
import FinalCTASection from "../components/FinalCTASection";
import { useAuth } from "../context/AuthContext";

// Main Home Page Component
export default function HomePage() {
  const { user, isAuthenticated, loading } = useAuth();

  return (
    <div className="min-h-screen text-[color:var(--text-primary)] overflow-x-hidden relative">
      {/* Animated Blob Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="blob-c">
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
        </div>
      </div>

      <main className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* App Mockup Section */}
        <MockupsSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Final CTA Section */}
        <FinalCTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}