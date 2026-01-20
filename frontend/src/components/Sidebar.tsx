"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListTodo, Settings, LogOut, User, Home, MessageSquare, Menu, X } from "lucide-react";
import { useState, useRef } from "react";

export default function Sidebar({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pos, setPos] = useState({ x: 16, y: 16 }); // initial position
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/todos", label: "Todos", icon: ListTodo },
    { href: "/dashboard/chat", label: "AI Chat", icon: MessageSquare },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging.current) {
      setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
    }
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  // Attach mouse events
  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }

  return (
    <>
      {/* Mobile floating menu button */}
      <button
        className="fixed z-50 md:hidden p-2 rounded-full bg-[color:var(--bg-card)] border border-[color:var(--border-neon)] shadow-lg hover:scale-110 transition-transform"
        style={{ top: pos.y, left: pos.x }}
        onMouseDown={handleMouseDown}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[color:var(--bg-card)] border-r border-[color:var(--border-neon)] shadow-xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:w-64`}
      >
        <div className="flex flex-col h-full">
          

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive(item.href)
                          ? "bg-gradient-to-r from-[#ff00ff]/20 to-[#00ffff]/20 text-[color:var(--neon-cyan)] border border-[color:var(--border-neon)] shadow-[0_0_15px_rgba(255,0,255,0.3)]"
                          : "text-[color:var(--text-secondary)] hover:text-[color:var(--neon-cyan)] hover:bg-[color:var(--bg-primary)]/30"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-[color:var(--border-neon)]">
            <button
              onClick={onLogout}
              className="w-full flex items-center px-4 py-3 rounded-lg text-[color:var(--text-primary)] hover:text-[color:var(--neon-pink)] hover:bg-[color:var(--bg-primary)]/30 transition-all duration-300"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}
