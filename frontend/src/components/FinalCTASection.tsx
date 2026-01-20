// frontend/src/components/FinalCTASection.tsx

import Link from 'next/link';

export default function FinalCTASection() {
  return (
    <section className="text-center py-20">
      <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Productivity?</h2>
      <p className="text-xl text-[color:var(--text-secondary)] mb-10 max-w-2xl mx-auto">
        Join thousands of satisfied users who have revolutionized their task management with Neon Todo.
      </p>
      <Link href="/signup" className="neon-button-primary text-2xl px-12 py-5">
        Start Your Free Trial
      </Link>
      <p className="mt-4 text-[color:var(--text-secondary)]">No credit card required • 14-day free trial</p>
    </section>
  );
}