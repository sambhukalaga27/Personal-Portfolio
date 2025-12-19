import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../core/services/content.service';
import { SectionHeaderComponent } from '../shared/components/section-header.component';
import { AppButtonComponent } from '../shared/components/button.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, AppButtonComponent],
  template: `
    <section id="contact" class="section">
      <div class="container">
        <app-section-header number="06." title="Currently"></app-section-header>
        
        <div class="currently-content">
           <ul class="status-list">
             <li><span class="label mono">Learning:</span> Advanced AI Agents development Tactics, Reinforcement Learning & Advanced Graph ML</li>
             <li><span class="label mono">Hunting:</span> Meaningful, high-impact roles in AI/ML/Data Science</li>
             <li><span class="label mono">Open to:</span> Collaborations, research, good memes</li>
           </ul>
        </div>

        <div class="contact-separator"></div>

        <div class="contact-content">
          <h2 class="title">Get In Touch</h2>
          <p class="text">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div class="email-action">
            <a [href]="'mailto:' + (basics()?.email || 'email@example.com')" class="email-link">
              <app-button variant="primary">Say Hello</app-button>
            </a>
          </div>

          <div class="social-links">
            <a *ngFor="let profile of basics()?.profiles" [href]="profile.url" target="_blank" class="social-icon" [attr.aria-label]="profile.network">
              <ng-container [ngSwitch]="profile.network.toLowerCase()">
                <svg *ngSwitchCase="'linkedin'" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                <svg *ngSwitchCase="'github'" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                <span *ngSwitchDefault>{{ profile.network }}</span>
              </ng-container>
            </a>
          </div>
        </div>
        
        <footer class="footer">
          <p class="mono">Designed & Built by {{ basics()?.name }}</p>
        </footer>
      </div>
    </section>
  `,
  styles: [`
    .currently-content {
      max-width: 800px;
      margin: 0 auto var(--space-3xl);
    }

    .status-list {
      list-style: none;
      padding: 0;
      
      li {
        margin-bottom: var(--space-md);
        font-size: 1.125rem;
        color: var(--text-secondary);
        display: flex;
        align-items: baseline;
        
        @media (max-width: 768px) {
          flex-direction: column;
        }
      }
      
      .label {
        color: var(--accent-primary);
        margin-right: var(--space-md);
        min-width: 100px;
        display: inline-block;
      }
    }

    .contact-separator {
      height: 1px;
      background: var(--border-color);
      width: 100%;
      max-width: 200px;
      margin: 0 auto var(--space-3xl);
    }

    .contact-content {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
      padding-bottom: var(--space-3xl);
    }

    .title {
      font-size: 3rem;
      color: var(--text-primary);
      margin-bottom: var(--space-md);
    }

    .text {
      color: var(--text-secondary);
      font-size: 1.125rem;
      margin-bottom: var(--space-2xl);
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: var(--space-lg);
      margin-top: var(--space-3xl);
    }

    .social-icon {
      color: var(--text-secondary);
      transition: color var(--transition-fast);
      
      &:hover {
        color: var(--accent-primary);
      }
    }

    .footer {
      text-align: center;
      margin-top: var(--space-3xl);
      color: var(--text-tertiary);
      font-size: 0.875rem;
    }
  `]
})
export class ContactComponent {
  contentService = inject(ContentService);
  basics = this.contentService.basics;
}
