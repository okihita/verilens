'use client';

import { useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

export function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  return (localStorage.getItem('verilens_theme') as ThemeMode) || 'light';
}

export function applyTheme(theme: ThemeMode): void {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;
  let resolvedTheme = theme;

  if (theme === 'system') {
    resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  root.setAttribute('data-theme', resolvedTheme);
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = getInitialTheme();
    setThemeState(savedTheme);
    applyTheme(savedTheme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      const current = (localStorage.getItem('verilens_theme') as ThemeMode) || 'light';
      if (current === 'system') {
        applyTheme('system');
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    setResolvedTheme(
      savedTheme === 'system'
        ? (mediaQuery.matches ? 'dark' : 'light')
        : savedTheme
    );

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const changeTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('verilens_theme', newTheme);
    applyTheme(newTheme);

    if (newTheme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setResolvedTheme(isDark ? 'dark' : 'light');
    } else {
      setResolvedTheme(newTheme);
    }
  };

  return { theme, resolvedTheme, changeTheme, setTheme: changeTheme };
}
