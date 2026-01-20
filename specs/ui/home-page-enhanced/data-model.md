# Data Model: Enhanced Home/Landing Page

## Overview

This document defines the data structures required for the Enhanced Home/Landing Page with cyberpunk neon theme.

## Core Data Structures

### LandingPageData
```typescript
interface LandingPageData {
  hero: HeroSection;
  features: FeatureCard[];
  testimonials: TestimonialCard[];
  faqs: FAQItem[];
  mockups: MockupItem[];
  isAuthenticated: boolean; // For conditional CTA rendering
}
```

### HeroSection
```typescript
interface HeroSection {
  title: string;           // Main headline text
  subtitle: string;        // Supporting text below title
  ctaPrimaryText: string;  // Primary CTA button text
  ctaSecondaryText: string; // Secondary CTA button text
  ctaPrimaryLink: string;  // Primary CTA destination
  ctaSecondaryLink: string; // Secondary CTA destination
}
```

### FeatureCard
```typescript
interface FeatureCard {
  id: string;              // Unique identifier
  icon: string;            // Lucide icon name (e.g., "zap", "lock", "star")
  title: string;           // Feature title
  description: string;     // Feature description
}
```

### TestimonialCard
```typescript
interface TestimonialCard {
  id: string;              // Unique identifier
  quote: string;           // Testimonial quote text
  author: string;          // Person who gave the testimonial
  role?: string;           // Their role/company (optional)
  avatar?: string;         // Avatar image URL (optional)
}
```

### FAQItem
```typescript
interface FAQItem {
  id: string;              // Unique identifier
  question: string;        // The question text
  answer: string;          // The answer text
  category?: string;       // Category for grouping (optional)
}
```

### MockupItem
```typescript
interface MockupItem {
  id: string;              // Unique identifier
  src: string;             // Image source path
  alt: string;             // Alt text for accessibility
  title?: string;          // Optional title for the mockup
  description?: string;    // Optional description
}
```

## Component Props Interfaces

### FeatureCard Props
```typescript
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;      // Additional CSS classes
}
```

### TestimonialCard Props
```typescript
interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  className?: string;
}
```

### FAQItem Props
```typescript
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}
```

## Validation Rules

### String Length Limits
- Hero title: 3-60 characters
- Hero subtitle: 10-120 characters
- Feature title: 3-30 characters
- Feature description: 10-150 characters
- Testimonial quote: 20-300 characters
- FAQ question: 5-100 characters
- FAQ answer: 10-500 characters

### Required Fields
- All fields in interfaces are required unless marked as optional with `?`
- MockupItem.src must be a valid image path
- Link fields must be valid URLs

### Content Guidelines
- All content should be appropriate for the target audience
- Links should follow the application's routing patterns
- Image paths should be relative to the public directory

## State Transitions

### FAQItem State
- **Initial State**: `isOpen = false`
- **Action**: User clicks on FAQ item
- **Transition**: `isOpen = !isOpen`
- **Result**: Answer section expands/collapses with animation

## Relationships

### Landing Page Composition
- LandingPageData **contains** one HeroSection
- LandingPageData **contains many** FeatureCard (1-12 recommended)
- LandingPageData **contains many** TestimonialCard (3-8 recommended)
- LandingPageData **contains many** FAQItem (5-15 recommended)
- LandingPageData **contains many** MockupItem (1-6 recommended)

## Future Extensibility

### Potential Additions
- BlogPreviewCard: For showing recent blog posts
- PricingTier: For displaying pricing options
- TeamMemberCard: For team introductions
- StatisticCard: For showing company metrics