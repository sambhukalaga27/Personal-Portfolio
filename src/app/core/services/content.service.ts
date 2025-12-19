import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { of } from 'rxjs';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private http = inject(HttpClient);
  private readonly contentUrl = '/assets/content/profile.json';

  // Load profile data
  private profile$ = this.http.get<Profile>(this.contentUrl).pipe(
    shareReplay(1),
    catchError(err => {
      console.error('Failed to load profile', err);
      return of(null);
    })
  );

  // Expose as a signal
  readonly profile = toSignal(this.profile$, { initialValue: null });

  // Computed signals for specific sections
  readonly basics = computed(() => this.profile()?.basics);
  readonly work = computed(() => this.profile()?.work || []);
  readonly education = computed(() => this.profile()?.education || []);
  readonly skills = computed(() => this.profile()?.skills || []);
  readonly projects = computed(() => this.profile()?.projects || []);
  readonly awards = computed(() => this.profile()?.awards || []);

  constructor() {}
}
