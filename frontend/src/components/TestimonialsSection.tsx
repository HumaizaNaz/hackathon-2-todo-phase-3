// frontend/src/components/TestimonialsSection.tsx

import TestimonialCard from './TestimonialCard';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "This app has completely transformed my workflow. I can't imagine my life without it! The cyberpunk aesthetic is amazing.",
      name: "Cyber-Punk #77",
      title: "Full-Stack Developer",
      image: "/images/develper.jpeg", // Path to developer image in public folder
    },
    {
      quote: "The clean, futuristic interface makes managing my tasks a joy. The analytics feature helps me stay on track.",
      name: "Glitch",
      title: "UI/UX Designer",
      image: "/images/develper.jpeg", // Path to developer image in public folder
    },
    {
      quote: "Finally, a todo app that understands the need for both style and substance. The team collaboration features are top-notch.",
      name: "Neon-Nomad",
      title: "Project Manager",
      image: "/images/develper.jpeg", // Path to developer image in public folder
    },
    {
      quote: "I've tried dozens of task management tools, but Neon Todo is by far the most intuitive and visually appealing.",
      name: "Code-Warrior",
      title: "Software Engineer",
      image: "/images/develper.jpeg", // Path to developer image in public folder
    },
  ];

  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-16">What Our Users Say</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            quote={testimonial.quote}
            name={testimonial.name}
            title={testimonial.title}
            imageSrc={testimonial.image}
          />
        ))}
      </div>
    </section>
  );
}