import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-header">
      <h2 class="title">
        <span class="number mono">{{ number }}</span>
        <span class="text">{{ title }}</span>
      </h2>
      <div class="line"></div>
    </div>
  `,
  styles: [`
    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: var(--space-2xl);
      gap: var(--space-md);
    }

    .title {
      display: flex;
      align-items: baseline;
      gap: var(--space-sm);
      font-size: 2rem;
      white-space: nowrap;
    }

    .number {
      color: var(--accent-primary);
      font-size: 1.25rem;
      font-weight: 400;
    }

    .text {
      color: var(--text-primary);
    }

    .line {
      height: 1px;
      background: var(--border-color);
      width: 100%;
      max-width: 300px;
    }
  `]
})
export class SectionHeaderComponent {
  @Input() number = '01.';
  @Input() title = '';
}
