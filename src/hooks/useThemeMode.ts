// src/hooks/useThemeMode.ts

'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export function useThemeMode() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = Cookies.get('theme');
    setDarkMode(savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    Cookies.set('theme', newMode ? 'dark' : 'light', {
      expires: 30,
      sameSite: 'Strict',
      path: '/',
    });
  };

  return { darkMode, toggleTheme };
}
