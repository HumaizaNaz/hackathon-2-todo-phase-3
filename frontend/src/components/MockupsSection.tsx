// frontend/src/components/MockupsSection.tsx
import MockupCard from './MockupCard';

export default function MockupsSection() {
  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-16">App Preview</h2>
      <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-center gap-8">
        <div className="w-full max-w-md">
          <MockupCard
            title="Desktop View"
            description="Full-featured interface optimized for productivity on larger screens"
            imageSrc="/images/desk.png" // <-- path relative to public folder
            orientation="horizontal"
          />
        </div>
        <div className="w-full max-w-xs">
          <MockupCard
            title="Mobile View"
            description="Streamlined experience designed for on-the-go task management"
            imageSrc="/images/mobile.png" // <-- path relative to public folder
            orientation="vertical"
          />
        </div>
      </div>
    </section>
  );
}
