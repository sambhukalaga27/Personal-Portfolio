import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly theme = signal<Theme>('dark');

  constructor() {
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      this.theme.set(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme.set(prefersDark ? 'dark' : 'light');
    }

    // Apply theme class to body
    effect(() => {
      const currentTheme = this.theme();
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(currentTheme);
      localStorage.setItem('theme', currentTheme);
    });
  }

  toggleTheme() {
    this.theme.update(t => t === 'dark' ? 'light' : 'dark');
  }
}
