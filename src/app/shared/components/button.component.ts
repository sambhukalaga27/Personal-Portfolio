import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [class]="'btn btn-' + variant" [type]="type">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1.5rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      font-family: var(--font-mono);
      font-size: 0.875rem;
      cursor: pointer;
      transition: all var(--transition-fast);
      border: 1px solid transparent;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      
      &:hover {
        transform: translateY(-2px);
      }
      
      &:active {
        transform: translateY(0);
      }
    }

    .btn-primary {
      background: var(--accent-primary);
      color: #000;
      box-shadow: 0 0 15px var(--accent-glow);
      
      &:hover {
        background: #fff;
        box-shadow: 0 0 25px var(--accent-glow);
      }
    }

    .btn-outline {
      background: transparent;
      border-color: var(--accent-primary);
      color: var(--accent-primary);
      
      &:hover {
        background: rgba(0, 240, 255, 0.1);
        box-shadow: 0 0 15px var(--accent-glow);
      }
    }

    .btn-ghost {
      background: transparent;
      color: var(--text-secondary);
      
      &:hover {
        color: var(--text-primary);
        background: rgba(255, 255, 255, 0.05);
      }
    }
  `]
})
export class AppButtonComponent {
  @Input() variant: 'primary' | 'outline' | 'ghost' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}
