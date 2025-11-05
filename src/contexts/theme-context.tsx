import React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  systemTheme?: 'light' | 'dark';
  resolvedTheme?: 'light' | 'dark';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

export function useTheme(): ThemeContextType {
  const { theme, setTheme, systemTheme, resolvedTheme } = useNextTheme();

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return {
    theme: (theme as Theme) || 'system',
    toggleTheme,
    setTheme: setTheme as (theme: Theme) => void,
    systemTheme: systemTheme as 'light' | 'dark' | undefined,
    resolvedTheme: resolvedTheme as 'light' | 'dark' | undefined,
  };
}
