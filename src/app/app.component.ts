import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from './core/services/theme.service';
import { ThemeToggleComponent } from './shared/components/theme-toggle.component';
import { HeroComponent } from './sections/hero.component';
import { AboutComponent } from './sections/about.component';
import { ExperienceComponent } from './sections/experience.component';
import { ProjectsComponent } from './sections/projects.component';
import { SkillsComponent } from './sections/skills.component';
import { EducationComponent } from './sections/education.component';
import { ContactComponent } from './sections/contact.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        ThemeToggleComponent,
        HeroComponent,
        AboutComponent,
        ExperienceComponent,
        ProjectsComponent,
        SkillsComponent,
        EducationComponent,
        ContactComponent
    ],
    template: `
    <div class="app-layout">
      <div class="noise-overlay"></div>
      
      <header class="header glass-panel" [class.scrolled]="isScrolled">
        <div class="container header-content">
          <div class="logo mono">S</div>
          
          <nav class="nav">
            <ol class="nav-list mono">
              <li><a href="#about" (click)="scrollTo('about')"><span class="number">01.</span> About</a></li>
              <li><a href="#experience" (click)="scrollTo('experience')"><span class="number">02.</span> Experience</a></li>
              <li><a href="#projects" (click)="scrollTo('projects')"><span class="number">03.</span> Projects</a></li>
              <li><a href="#skills" (click)="scrollTo('skills')"><span class="number">05.</span> Skills</a></li>
              <li><a href="#education" (click)="scrollTo('education')"><span class="number">06.</span> Education</a></li>
              <li><a href="#contact" (click)="scrollTo('contact')"><span class="number">07.</span> Contact</a></li>
            </ol>
            <app-theme-toggle></app-theme-toggle>
          </nav>
        </div>
      </header>

      <main>
        <app-hero></app-hero>
        <app-about></app-about>
        <app-experience></app-experience>
        <app-projects></app-projects>
        <app-skills></app-skills>
        <app-education></app-education>
        <app-contact></app-contact>
      </main>
      
      <div class="side-email mono">
        <a href="mailto:saisambhuprasadkalaga@gmail.com">saisambhuprasadkalaga@gmail.com</a>
        <div class="line"></div>
      </div>
    </div>
  `,
    styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      padding: var(--space-md) 0;
      transition: all var(--transition-normal);
      border: none;
      border-radius: 0;
      background: rgba(10, 10, 10, 0.85);
      
      &.scrolled {
        padding: var(--space-sm) 0;
        box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);
      }
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      color: var(--accent-primary);
      font-size: 1.5rem;
      font-weight: 700;
      border: 2px solid var(--accent-primary);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }

    .nav {
      display: flex;
      align-items: center;
      gap: var(--space-xl);
    }

    .nav-list {
      display: flex;
      gap: var(--space-xl);
      list-style: none;
      margin: 0;
      padding: 0;
      
      @media (max-width: 768px) {
        display: none;
      }
      
      a {
        font-size: 0.875rem;
        color: var(--text-secondary);
        
        &:hover {
          color: var(--accent-primary);
        }
        
        .number {
          color: var(--accent-primary);
          margin-right: var(--space-xs);
        }
      }
    }

    .side-email {
      position: fixed;
      right: var(--space-xl);
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-lg);
      
      @media (max-width: 1024px) {
        display: none;
      }
      
      a {
        writing-mode: vertical-rl;
        color: var(--text-secondary);
        font-size: 0.875rem;
        letter-spacing: 0.1em;
        
        &:hover {
          color: var(--accent-primary);
          transform: translateY(-3px);
        }
      }
      
      .line {
        width: 1px;
        height: 90px;
        background: var(--text-secondary);
      }
    }
  `]
})
export class AppComponent {
    themeService = inject(ThemeService);
    isScrolled = false;

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.isScrolled = window.scrollY > 50;
    }

    scrollTo(id: string) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
