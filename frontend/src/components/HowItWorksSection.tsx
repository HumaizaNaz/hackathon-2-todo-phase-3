// frontend/src/components/HowItWorksSection.tsx

export default function HowItWorksSection() {
  const howItWorks = [
    {
      step: 1,
      title: "Create Account",
      description: "Sign up in seconds and start organizing your tasks immediately.",
    },
    {
      step: 2,
      title: "Add Tasks",
      description: "Create tasks with due dates, priorities, and categories.",
    },
    {
      step: 3,
      title: "Collaborate",
      description: "Share tasks with team members and track progress together.",
    },
    {
      step: 4,
      title: "Achieve Goals",
      description: "Complete tasks and celebrate your productivity wins.",
    },
  ];

  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {howItWorks.map((step, index) => (
          <div key={index} className="neon-card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-[color:var(--neon-pink)] text-[color:var(--bg-primary)] flex items-center justify-center text-xl font-bold mx-auto mb-4">
              {step.step}
            </div>
            <h3 className="text-xl font-bold mb-2 text-[color:var(--text-primary)]">{step.title}</h3>
            <p className="text-[color:var(--text-secondary)]">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}