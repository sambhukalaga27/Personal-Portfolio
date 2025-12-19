import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../core/services/content.service';
import { SectionHeaderComponent } from '../shared/components/section-header.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  template: `
    <section id="skills" class="section">
      <div class="container">
        <app-section-header number="04." title="Technical Skills"></app-section-header>
        
        <div class="skills-grid">
          <div *ngFor="let category of skills()" class="skill-category">
            <h3 class="category-title mono">{{ category.name }}</h3>
            <div class="skill-tags">
              <span *ngFor="let skill of category.keywords" class="skill-tag">{{ skill }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: var(--space-xl);
    }

    .category-title {
      color: var(--accent-primary);
      font-size: 1rem;
      margin-bottom: var(--space-md);
      border-bottom: 1px solid var(--border-color);
      padding-bottom: var(--space-xs);
      display: inline-block;
    }

    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
    }

    .skill-tag {
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-secondary);
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-full);
      font-size: 0.875rem;
      transition: all var(--transition-fast);
      border: 1px solid transparent;
      
      &:hover {
        background: rgba(0, 240, 255, 0.1);
        color: var(--accent-primary);
        border-color: var(--accent-primary);
        transform: translateY(-2px);
      }
    }
  `]
})
export class SkillsComponent {
  contentService = inject(ContentService);
  skills = this.contentService.skills;
}
