import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../core/services/content.service';
import { SectionHeaderComponent } from '../shared/components/section-header.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  template: `
    <section id="experience" class="section">
      <div class="container">
        <app-section-header number="02." title="Where I've Worked"></app-section-header>
        
        <div class="tabs-container">
          <div class="tabs-list" role="tablist" aria-label="Job tabs">
            <button 
              *ngFor="let job of work(); let i = index"
              class="tab-button mono"
              [class.active]="activeTab() === i"
              (click)="activeTab.set(i)"
              role="tab"
              [attr.aria-selected]="activeTab() === i"
              [attr.aria-controls]="'panel-' + i"
              [id]="'tab-' + i">
              {{ job.name }}
            </button>
            <div class="highlight-bar" [style.transform]="'translateY(' + (activeTab() * 42) + 'px)'"></div>
          </div>

          <div class="panels">
            <div 
              *ngFor="let job of work(); let i = index"
              class="tab-panel"
              [hidden]="activeTab() !== i"
              role="tabpanel"
              [id]="'panel-' + i"
              [attr.aria-labelledby]="'tab-' + i">
              
              <h3 class="job-title">
                <span>{{ job.position }}</span>
                <span class="company"> @ {{ job.name }}</span>
              </h3>
              
              <p class="job-range mono">{{ job.startDate }} - {{ job.endDate }}</p>
              
              <ul class="job-details">
                <li *ngFor="let highlight of job.highlights">{{ highlight }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .tabs-container {
      display: flex;
      gap: var(--space-2xl);
      min-height: 300px;
      
      @media (max-width: 768px) {
        flex-direction: column;
        gap: var(--space-lg);
      }
    }

    .tabs-list {
      position: relative;
      display: flex;
      flex-direction: column;
      width: max-content;
      padding-left: 2px;
      border-left: 2px solid var(--bg-tertiary);
      
      @media (max-width: 768px) {
        flex-direction: row;
        width: 100%;
        overflow-x: auto;
        border-left: none;
        border-bottom: 2px solid var(--bg-tertiary);
        padding-left: 0;
        padding-bottom: 2px;
      }
    }

    .tab-button {
      background: transparent;
      border: none;
      text-align: left;
      padding: 0 var(--space-lg);
      height: 42px;
      color: var(--text-tertiary);
      cursor: pointer;
      transition: all var(--transition-fast);
      white-space: nowrap;
      
      &:hover, &.active {
        color: var(--accent-primary);
        background: rgba(0, 240, 255, 0.05);
      }
      
      @media (max-width: 768px) {
        padding: 0 var(--space-md);
        text-align: center;
      }
    }

    .highlight-bar {
      position: absolute;
      top: 0;
      left: -2px;
      width: 2px;
      height: 42px;
      background: var(--accent-primary);
      transition: transform var(--transition-normal);
      
      @media (max-width: 768px) {
        top: auto;
        bottom: -2px;
        left: 0;
        width: 100px; /* Needs dynamic width calculation in real app */
        height: 2px;
        display: none; /* Simplified for mobile for now */
      }
    }

    .panels {
      flex: 1;
    }

    .job-title {
      font-size: 1.5rem;
      margin-bottom: var(--space-xs);
      color: var(--text-primary);
      
      .company {
        color: var(--accent-primary);
      }
    }

    .job-range {
      font-size: 0.875rem;
      color: var(--text-tertiary);
      margin-bottom: var(--space-lg);
    }

    .job-details {
      list-style: none;
      padding: 0;
      
      li {
        position: relative;
        padding-left: var(--space-lg);
        margin-bottom: var(--space-md);
        color: var(--text-secondary);
        
        &::before {
          content: '▹';
          position: absolute;
          left: 0;
          color: var(--accent-primary);
        }
      }
    }
  `]
})
export class ExperienceComponent {
  contentService = inject(ContentService);
  work = this.contentService.work;
  activeTab = signal(0);
}
