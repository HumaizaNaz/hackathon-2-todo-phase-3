// frontend/src/components/ThemeProviderWrapper.tsx
"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ThemeProvider with ssr disabled to prevent hydration issues
const DynamicThemeProvider = dynamic(
  () => import('../context/ThemeContext').then(mod => ({ default: mod.ThemeProvider })),
  { ssr: false }
);

export default function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  return <DynamicThemeProvider>{children}</DynamicThemeProvider>;
}