// frontend/src/app/error.tsx
"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Blob Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="blob-c">
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
        </div>
      </div>

      <div className="bg-[color:var(--bg-card)] rounded-lg border border-red-500/50 shadow-[0_0_30px_rgba(255,0,0,0.3)] p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-[color:var(--neon-pink)]">Something went wrong!</h2>
        <p className="text-lg mb-4 text-[color:var(--text-secondary)]">{error.message}</p>
        <button
          className="neon-button-primary px-6 py-3"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
        <p className="mt-4 text-sm text-[color:var(--text-secondary)]">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
}
