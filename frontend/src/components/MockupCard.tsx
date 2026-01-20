// frontend/src/components/MockupCard.tsx
import Image from 'next/image';

export default function MockupCard({
  title,
  description,
  imageSrc, // <-- add this prop
  orientation = "horizontal", // default to horizontal
}: {
  title: string;
  description: string;
  imageSrc: string;
  orientation?: "horizontal" | "vertical";
}) {
  // Set dimensions based on orientation
  const isVertical = orientation === "vertical";
  const containerHeight = isVertical ? "h-80" : "h-48";
  const imageWidth = isVertical ? 200 : 300;
  const imageHeight = isVertical ? 400 : 192;

  return (
    <div className="neon-card p-6 text-center h-full flex flex-col">
      <div className={`w-full ${containerHeight} neon-border rounded-lg flex items-center justify-center mb-4 overflow-hidden relative`}>
        {isVertical ? (
          // Mobile device frame
          <div className="relative w-32 h-64 border-4 border-gray-800 rounded-[32px] bg-black overflow-hidden">
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-800 rounded-full"></div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-gray-800 rounded-full"></div>
            <div className="absolute inset-2 rounded-[28px] overflow-hidden">
              <Image
                src={imageSrc} // path from public folder
                alt={title}
                width={200}   // Fixed width for mobile
                height={400}  // Fixed height for mobile
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        ) : (
          // Desktop frame
          <div className="relative w-full h-full">
            <div className="absolute inset-0 border-2 border-gray-800 rounded-lg overflow-hidden">
              <Image
                src={imageSrc} // path from public folder
                alt={title}
                width={300}   // Fixed width for desktop
                height={192}  // Fixed height for desktop
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold mb-2 text-[color:var(--text-primary)]">{title}</h3>
      <p className="text-[color:var(--text-secondary)]">{description}</p>
    </div>
  );
}
