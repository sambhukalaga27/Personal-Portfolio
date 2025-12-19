import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../core/services/content.service';
import { SectionHeaderComponent } from '../shared/components/section-header.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  template: `
    <section id="about" class="section">
      <div class="container">
        <app-section-header number="01." title="About Me"></app-section-header>
        
        <div class="content">
          <div class="text">
            <p>{{ basics()?.summary }}</p>
            <p>
              I am currently based in <span class="highlight">{{ basics()?.location?.city }}, {{ basics()?.location?.region }}</span>.
            </p>
            
            <div class="tech-stack">
              <p class="mono">Here are a few technologies I've been working with recently:</p>
              <ul class="skills-list">
                <li *ngFor="let skill of topSkills()">{{ skill }}</li>
              </ul>
            </div>
          </div>
          
          <div class="image-wrapper">
            <div class="image-container">
              <img src="/assets/images/profile-dp.png" alt="Profile Picture" class="profile-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .content {
      display: grid;
      grid-template-columns: 3fr 2fr;
      gap: var(--space-2xl);
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .text {
      color: var(--text-secondary);
      font-size: 1.125rem;
    }

    .highlight {
      color: var(--accent-primary);
    }

    .tech-stack {
      margin-top: var(--space-lg);
    }

    .skills-list {
      display: grid;
      grid-template-columns: repeat(2, minmax(140px, 200px));
      gap: var(--space-xs);
      padding: 0;
      margin-top: var(--space-md);
      list-style: none;
      
      li {
        position: relative;
        padding-left: var(--space-lg);
        font-family: var(--font-mono);
        font-size: 0.875rem;
        
        &::before {
          content: '▹';
          position: absolute;
          left: 0;
          color: var(--accent-primary);
        }
      }
    }

    .image-wrapper {
      position: relative;
      max-width: 300px;
      margin: 0 auto;
      width: 100%;
      
      @media (min-width: 768px) {
        margin: 0;
      }
    }

    .image-container {
      position: relative;
      width: 100%;
      padding-bottom: 100%; /* Square aspect ratio */
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      overflow: hidden;
    }
    
    .profile-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `]
})
export class AboutComponent {
  contentService = inject(ContentService);
  basics = this.contentService.basics;
  skills = this.contentService.skills;

  topSkills() {
    return [
      'LangChain & LangGraph',
      'LLMs',
      'Agent AI Development',
      'Deep Learning',
      'Angular/Node.js/React',
      'Software Development'
    ];
  }
}
