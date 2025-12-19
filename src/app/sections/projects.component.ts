import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../core/services/content.service';
import { SectionHeaderComponent } from '../shared/components/section-header.component';
import { AppCardComponent } from '../shared/components/card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, AppCardComponent],
  template: `
    <section id="projects" class="section">
      <div class="container">
        <app-section-header number="03." title="Some Things I've Built"></app-section-header>
        
        <div class="projects-grid">
          <a *ngFor="let project of projects()" 
             [href]="project.url" 
             target="_blank" 
             class="project-card-link"
             [attr.aria-label]="'View ' + project.name">
            <app-card [hoverEffect]="true" class="project-card-wrapper">
            <div class="project-content">
              <div class="project-top">
                <div class="folder-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                </div>
                <div class="project-links">
                  <span class="external-icon" *ngIf="project.url">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </span>
                </div>
              </div>
              
              <h3 class="project-title">{{ project.name }}</h3>
              
              <div class="project-description">
                <p>{{ project.description }}</p>
              </div>
              
              <ul class="project-tech-list mono">
                <li *ngFor="let tech of project.keywords">{{ tech }}</li>
              </ul>
            </div>
          </app-card>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--space-lg);
    }

    .project-card-link {
      display: block;
      height: 100%;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    .project-card-wrapper {
      height: 100%;
      display: block;
    }

    .project-content {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .project-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-lg);
      
      .folder-icon {
        color: var(--accent-primary);
      }
      
      .project-links {
        display: flex;
        gap: var(--space-md);
        color: var(--text-secondary);
        
        a:hover {
          color: var(--accent-primary);
        }
      }
    }

    .project-title {
      color: var(--text-primary);
      font-size: 1.5rem;
      margin-bottom: var(--space-md);
      transition: color var(--transition-fast);
      
      &:hover {
        color: var(--accent-primary);
      }
    }

    .project-description {
      color: var(--text-secondary);
      font-size: 1rem;
      margin-bottom: var(--space-lg);
      flex-grow: 1;
    }

    .project-tech-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
      list-style: none;
      padding: 0;
      font-size: 0.75rem;
      color: var(--text-tertiary);
      
      li {
        margin-right: var(--space-sm);
      }
    }
  `]
})
export class ProjectsComponent {
  contentService = inject(ContentService);
  projects = this.contentService.projects;
}
