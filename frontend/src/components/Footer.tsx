// frontend/src/components/Footer.tsx
import Link from "next/link";
import { Sun, Moon, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--border-neon)] py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[color:var(--text-primary)] mb-4">Neon Todo</h3>
            <p className="text-[color:var(--text-secondary)]">The ultimate task manager for the modern, cyber-enhanced individual.</p>
          </div>
          <div>
            <h4 className="font-bold text-[color:var(--text-primary)] mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-[color:var(--text-secondary)] hover:text-[color:var(--neon-pink)] transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="text-[color:var(--text-secondary)] hover:text-[color:var(--neon-pink)] transition-colors">Pricing</Link></li>
              <li><Link href="/updates" className="text-[color:var(--text-secondary)] hover:text-[color:var(--neon-pink)] transition-colors">Updates</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[color:var(--text-primary)] mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-[color:var(--text-secondary)] hover:text-[color:var(--neon-pink)] transition-colors">About</Link></li>
              <li><Link href="/blog" className="text-[color:var(--text-secondary)] hover:text-[color:var(--neon-pink)] transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-[color:var(--text-secondary)] hover:text-[color:var(--neon-pink)] transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[color:var(--text-primary)] mb-4">Connect</h4>
            <div className="flex space-x-4 justify-start sm:justify-center md:justify-start">
              <Link href="#" className="text-[color:var(--text-secondary)] hover:text-[color:var(--neon-cyan)] transition-colors">
                <Globe size={20} />
              </Link>
              <Link href="#" className="text-[color:var(--text-secondary)] hover:text-[color:var(--neon-cyan)] transition-colors">
                <Sun size={20} />
              </Link>
              <Link href="#" className="text-[color:var(--text-secondary)] hover:text-[color:var(--neon-cyan)] transition-colors">
                <Moon size={20} />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-[color:var(--border-neon)] mt-8 pt-8 text-center">
          <p className="text-[color:var(--text-secondary)]">&copy; {new Date().getFullYear()} Neon Todo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
