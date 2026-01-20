# Quickstart Guide: Enhanced Home/Landing Page Development

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Next.js project set up with App Router
- Tailwind CSS configured
- TypeScript configured (optional but recommended)

## Setup Commands

### 1. Install Required Dependencies
```bash
npm install lucide-react
# If not already installed:
npm install next react react-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Configure Tailwind for Neon Theme
Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#ff00ff',
        'neon-cyan': '#00ffff',
        'neon-purple': '#cc00ff',
        'neon-yellow': '#ffff00',
      },
      boxShadow: {
        'neon': '0 0 8px theme(colors.neon-pink), inset 0 0 8px theme(colors.neon-pink)',
        'neon-hover': '0 0 15px theme(colors.neon-pink), inset 0 0 15px theme(colors.neon-pink)',
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
}
```

### 3. Create Directory Structure
```bash
mkdir -p src/components
mkdir -p public/images/mockups
```

## Component Creation

### 1. Create FeatureCard Component
```bash
touch src/components/FeatureCard.tsx
```

Example content:
```tsx
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-900 border border-neon-pink rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-neon-hover">
      <div className="text-neon-cyan mb-4">
        <Icon size={40} />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
```

### 2. Create FAQItem Component
```bash
touch src/components/FAQItem.tsx
```

Example content:
```tsx
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 py-4">
      <button
        className="flex justify-between items-center w-full text-left py-2 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white font-medium">{question}</span>
        <ChevronDown
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          size={20}
        />
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-300 pl-2 animate-fadeIn">
          {answer}
        </div>
      )}
    </div>
  );
}
```

### 3. Create TestimonialCard Component
```bash
touch src/components/TestimonialCard.tsx
```

Example content:
```tsx
interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
}

export default function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <div className="bg-gray-800 border border-neon-purple rounded-lg p-6 shadow-lg">
      <div className="text-neon-yellow text-4xl mb-2">"</div>
      <p className="text-white italic mb-4">{quote}</p>
      <div>
        <p className="text-neon-cyan font-semibold">{author}</p>
        {role && <p className="text-gray-400 text-sm">{role}</p>}
      </div>
    </div>
  );
}
```

## Update Main Page

### 1. Backup Original Page
```bash
cp src/app/page.tsx src/app/page.tsx.backup
```

### 2. Update src/app/page.tsx
Replace the content with the enhanced landing page structure including all sections (Hero, Features, Mockups, Testimonials, FAQ, Footer).

## Running the Application

### Development
```bash
npm run dev
```

Visit `http://localhost:3000` to see the enhanced landing page.

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

## Testing Checklist

### Visual Elements
- [ ] Neon theme applied consistently
- [ ] Animated blob background visible
- [ ] Hover effects on cards and buttons
- [ ] Responsive layout on all screen sizes

### Functional Elements
- [ ] FAQ accordion opens/closes correctly
- [ ] CTA buttons work as expected
- [ ] All links are functional
- [ ] Images load properly

### Performance
- [ ] Page loads in under 3 seconds
- [ ] Smooth animations
- [ ] No console errors

## Common Issues & Solutions

### Neon Effects Not Showing
- Verify Tailwind config includes the neon colors
- Check that CSS classes are applied correctly

### FAQ Accordion Not Working
- Ensure the component is a client component with `'use client'` directive
- Verify state management is properly implemented

### Responsive Issues
- Check Tailwind's responsive prefixes are used correctly
- Test on multiple device sizes