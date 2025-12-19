import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../core/services/content.service';
import { SectionHeaderComponent } from '../shared/components/section-header.component';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  template: `
    <section id="education" class="section">
      <div class="container">
        <app-section-header number="05." title="Education"></app-section-header>
        
        <div class="education-list">
          <div *ngFor="let edu of education()" class="education-item glass-panel">
            <div class="edu-header">
              <h3 class="institution">{{ edu.institution }}</h3>
              <span class="dates mono">{{ edu.startDate }} - {{ edu.endDate }}</span>
            </div>
            <div class="edu-details">
              <h4 class="degree">{{ edu.studyType }} <span *ngIf="edu.area">in {{ edu.area }}</span></h4>
              <p class="score mono" *ngIf="edu.score">GPA: {{ edu.score }}</p>
            </div>
          </div>
        </div>

        <div class="achievements-list" *ngIf="awards().length > 0">
          <h3 class="achievements-title">Achievements & Awards</h3>
          <ul>
            <li *ngFor="let award of awards()">
              <span class="award-title">{{ award.title }}</span>
              <span class="award-date mono" *ngIf="award.date"> - {{ award.date }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .education-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
      margin-bottom: var(--space-2xl);
    }

    .education-item {
      padding: var(--space-lg);
      transition: transform var(--transition-normal);
      
      &:hover {
        transform: translateX(10px);
        border-color: var(--accent-primary);
      }
    }

    .edu-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: var(--space-xs);
      flex-wrap: wrap;
      gap: var(--space-sm);
    }

    .institution {
      color: var(--text-primary);
      font-size: 1.25rem;
    }

    .dates {
      color: var(--text-tertiary);
      font-size: 0.875rem;
    }

    .degree {
      color: var(--accent-primary);
      font-size: 1rem;
      font-weight: 400;
      margin-bottom: var(--space-xs);
    }

    .score {
      color: var(--text-secondary);
      font-size: 0.875rem;
    }

    .achievements-title {
      font-size: 1.5rem;
      color: var(--text-primary);
      margin-bottom: var(--space-lg);
    }

    .achievements-list ul {
      list-style: none;
      padding: 0;
      
      li {
        position: relative;
        padding-left: var(--space-lg);
        margin-bottom: var(--space-sm);
        color: var(--text-secondary);
        
        &::before {
          content: '★';
          position: absolute;
          left: 0;
          color: var(--accent-primary);
          font-size: 0.8rem;
          top: 4px;
        }
      }
    }
    
    .award-title {
      color: var(--text-primary);
    }
  `]
})
export class EducationComponent {
  contentService = inject(ContentService);
  education = this.contentService.education;
  awards = this.contentService.awards;
}
