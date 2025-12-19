import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="theme-toggle" (click)="themeService.toggleTheme()" [attr.aria-label]="'Toggle theme'">
      <div class="icon-container">
        <span class="icon sun" *ngIf="themeService.theme() === 'light'">☀️</span>
        <span class="icon moon" *ngIf="themeService.theme() === 'dark'">🌙</span>
      </div>
    </button>
  `,
  styles: [`
    .theme-toggle {
      background: transparent;
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-fast);
      
      &:hover {
        border-color: var(--accent-primary);
        color: var(--accent-primary);
      }
    }
    
    .icon {
      font-size: 1.2rem;
    }
  `]
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
}
