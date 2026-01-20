// frontend/src/components/TestimonialCard.tsx
import Image from 'next/image';

export default function TestimonialCard({
  quote,
  name,
  title,
  imageSrc
}: {
  quote: string;
  name: string;
  title: string;
  imageSrc?: string; // Optional prop for backward compatibility
}) {
  return (
    <div className="neon-card p-6 h-full flex flex-col">
      <div className="text-[color:var(--neon-yellow)] text-4xl mb-2">"</div>
      <p className="text-[color:var(--text-primary)] italic mb-4 flex-grow">{quote}</p>
      <div className="flex items-center mt-4 pt-4 border-t border-[color:var(--border-neon)]">
        {imageSrc ? (
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-[color:var(--neon-pink)]">
            <Image
              src={imageSrc}
              alt={name}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-[color:var(--bg-card)] border-2 border-[color:var(--neon-pink)] flex items-center justify-center mr-4">
            <span className="text-[color:var(--neon-cyan)] font-bold">{name.charAt(0)}</span>
          </div>
        )}
        <div>
          <p className="font-bold text-[color:var(--neon-cyan)]">{name}</p>
          <p className="text-sm text-[color:var(--text-secondary)]">{title}</p>
        </div>
      </div>
    </div>
  );
}