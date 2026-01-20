// frontend/src/app/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-[(--bg-primary)] text-[(--text-primary)] flex items-center justify-center relative overflow-hidden">
      {/* Animated Blob Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="blob-c">
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[(--neon-cyan)]"></div>
        <p className="ml-4 text-xl text-[(--neon-cyan)] font-bold">Loading...</p>
      </div>
    </div>
  );
}
