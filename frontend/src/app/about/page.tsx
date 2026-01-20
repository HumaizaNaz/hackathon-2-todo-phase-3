// frontend/src/app/about/page.tsx
"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";
import Footer from "../../components/Footer";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Cyber-Punk Dev",
      role: "Lead Developer",
      bio: "Specializes in cutting-edge web technologies with a passion for cyberpunk aesthetics.",
      avatar: "/images/develper.jpeg"
    },
    {
      name: "Neon Designer",
      role: "UI/UX Lead",
      bio: "Creates stunning interfaces with a focus on user experience and futuristic design.",
      avatar: "/images/develper.jpeg"
    },
    {
      name: "Glitch Artist",
      role: "Creative Director",
      bio: "Brings innovative ideas to life with an eye for unique and engaging experiences.",
      avatar: "/images/develper.jpeg"
    },
    {
      name: "Code Warrior",
      role: "Backend Specialist",
      bio: "Ensures robust and scalable systems that power our cyberpunk dreams.",
      avatar: "/images/develper.jpeg"
    }
  ];

  const features = [
    {
      title: "Innovative Design",
      description: "We blend cutting-edge technology with cyberpunk aesthetics to create unique user experiences.",
      icon: "⚡"
    },
    {
      title: "Secure Infrastructure",
      description: "Your data is protected with the latest security protocols and encryption methods.",
      icon: "🛡️"
    },
    {
      title: "Real-time Sync",
      description: "Stay connected across all your devices with instant synchronization.",
      icon: "🔄"
    },
    {
      title: "Intuitive Interface",
      description: "Designed for efficiency with a focus on reducing cognitive load.",
      icon: "🧠"
    }
  ];

  return (
    <div className="min-h-screen text-[color:var(--text-primary)] overflow-x-hidden relative">
      {/* Animated Blob Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="blob-c">
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
        </div>
      </div>

      <main className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <section className="text-center py-20 md:py-32">
          <h1 className="text-5xl md:text-7xl font-bold neon-text-gradient mb-6">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-[color:var(--text-secondary)] max-w-3xl mx-auto mb-10">
            We're a team of passionate developers and designers creating the future of task management with a cyberpunk twist.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/" className="neon-button-primary text-lg px-8 py-4">
              Back to Home <MoveRight className="ml-2" />
            </Link>
            <Link href="/signup" className="neon-button-secondary text-lg px-8 py-4">
              Join Us
            </Link>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12">Our Mission</h2>
            <p className="text-xl text-[color:var(--text-secondary)] leading-relaxed mb-8">
              At Neon Todo, we believe that productivity tools should be as exciting and inspiring as the work they help you accomplish.
              Our mission is to transform mundane task management into an engaging, visually stunning experience that motivates you
              to achieve more.
            </p>
            <p className="text-xl text-[color:var(--text-secondary)] leading-relaxed">
              We're building the future of productivity, one neon-lit task at a time.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <h2 className="text-4xl font-bold text-center mb-16">What Makes Us Special</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="neon-card p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-[color:var(--text-primary)]">{feature.title}</h3>
                <p className="text-[color:var(--text-secondary)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <h2 className="text-4xl font-bold text-center mb-16">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="neon-card p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-[color:var(--neon-pink)] overflow-hidden">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1 text-[color:var(--text-primary)]">{member.name}</h3>
                <p className="text-[color:var(--neon-cyan)] mb-3">{member.role}</p>
                <p className="text-[color:var(--text-secondary)] text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Our Philosophy</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-[color:var(--neon-pink)]">Design First</h3>
                <p className="text-[color:var(--text-secondary)]">
                  We believe that beautiful design enhances functionality. Every pixel is crafted with intention,
                  creating interfaces that are both visually stunning and highly functional.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-[color:var(--neon-cyan)]">User Focused</h3>
                <p className="text-[color:var(--text-secondary)]">
                  Our users come first. We constantly iterate based on feedback and strive to create experiences
                  that feel intuitive and empowering.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-[color:var(--neon-purple)]">Innovation Driven</h3>
                <p className="text-[color:var(--text-secondary)]">
                  We push the boundaries of what's possible in web applications, leveraging the latest technologies
                  to create truly unique experiences.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-[color:var(--neon-yellow)]">Security Conscious</h3>
                <p className="text-[color:var(--text-secondary)]">
                  Your privacy and security are paramount. We implement industry-leading security measures to
                  protect your data at every level.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-20">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Productivity?</h2>
          <p className="text-xl text-[color:var(--text-secondary)] mb-10 max-w-2xl mx-auto">
            Join thousands of forward-thinking individuals who have revolutionized their task management with Neon Todo.
          </p>
          <Link href="/signup" className="neon-button-primary text-2xl px-12 py-5">
            Start Your Free Trial
          </Link>
          <p className="mt-4 text-[color:var(--text-secondary)]">No credit card required • 14-day free trial</p>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
