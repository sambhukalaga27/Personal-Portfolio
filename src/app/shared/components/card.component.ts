import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card glass-panel" [class.hover-effect]="hoverEffect">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .card {
      padding: var(--space-lg);
      height: 100%;
      transition: transform var(--transition-normal), border-color var(--transition-normal);
    }

    .hover-effect:hover {
      transform: translateY(-5px);
      border-color: var(--accent-primary);
      box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
    }
  `]
})
export class AppCardComponent {
  @Input() hoverEffect = false;
}
