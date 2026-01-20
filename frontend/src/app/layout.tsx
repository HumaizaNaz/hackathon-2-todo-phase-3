// frontend/src/app/layout.tsx
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import ThemeProviderWrapper from "../components/ThemeProviderWrapper";
import FloatingChat from "../components/FloatingChat";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] transition-colors duration-300">
        <ThemeProviderWrapper>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <FloatingChat />
            </div>
          </AuthProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
