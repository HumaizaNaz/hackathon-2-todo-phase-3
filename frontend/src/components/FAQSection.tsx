// frontend/src/components/FAQSection.tsx

import FAQItem from './FAQItem';

export default function FAQSection() {
  const faqs = [
    {
      question: "Is Neon Todo free to use?",
      answer: "Yes, we offer a generous free tier with all essential features. Premium plans unlock advanced analytics and collaboration tools.",
    },
    {
      question: "Can I access my tasks on multiple devices?",
      answer: "Absolutely! Your tasks are synced across all your devices in real-time with our secure cloud infrastructure.",
    },
    {
      question: "How secure is my data?",
      answer: "We take your data security very seriously. All data is encrypted both in transit and at rest using industry-standard protocols.",
    },
    {
      question: "Can I collaborate with my team?",
      answer: "Yes, our collaboration features allow you to share task lists, assign tasks, and track team progress in real-time.",
    },
    {
      question: "Do you offer API access?",
      answer: "Yes, we provide a comprehensive API for developers to integrate Neon Todo with other tools and services.",
    },
  ];

  return (
    <section className="py-20 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
}