import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../core/services/content.service';
import { AppButtonComponent } from '../shared/components/button.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, AppButtonComponent],
  template: `
    <section class="hero section">
      <div class="container">
        <p class="greeting mono neon-text">Hi, my name is</p>
        <h1 class="name">{{ basics()?.name }}</h1>
        <h2 class="title">{{ basics()?.label }}</h2>
        <p class="summary">{{ basics()?.summary }}</p>
        
        <div class="actions">
          <app-button variant="primary" (click)="scrollToExperience()">Check out my work</app-button>
          <app-button variant="outline" (click)="downloadResume()">Get Resume</app-button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-top: 0;
    }

    .greeting {
      font-size: 1rem;
      margin-bottom: var(--space-md);
    }

    .name {
      font-size: clamp(3rem, 8vw, 5rem);
      color: var(--text-primary);
      margin-bottom: var(--space-xs);
    }

    .title {
      font-size: clamp(2rem, 5vw, 4rem);
      color: var(--text-secondary);
      margin-bottom: var(--space-lg);
    }

    .summary {
      max-width: 600px;
      font-size: 1.125rem;
      color: var(--text-tertiary);
      margin-bottom: var(--space-2xl);
    }

    .actions {
      display: flex;
      gap: var(--space-md);
    }
  `]
})
export class HeroComponent {
  contentService = inject(ContentService);
  basics = this.contentService.basics;

  scrollToProjects() {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToExperience() {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  }

  downloadResume() {
    window.open('/assets/KalagaSaiSambhu_Resume.pdf', '_blank');
  }
}
