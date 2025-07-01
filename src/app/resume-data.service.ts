import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, effect } from '@angular/core';
import { Observable } from 'rxjs';
import { IResume } from '../resume.data.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResumeDataService {
  http = inject(HttpClient);
  
  // Signal for data source state with localStorage persistence
  useFakeData = signal(this.getInitialDataSource());

  constructor() {
    // Persist data source changes to localStorage
    effect(() => {
      if (!environment.production) {
        localStorage.setItem('resumeDataSource', this.useFakeData() ? 'fake' : 'real');
      }
    });
  }

  getData(): Observable<IResume[]> {
    const url = this.getDataUrl(this.useFakeData());
    console.log('ResumeDataService.getData() called, useFakeData:', this.useFakeData(), 'URL:', url);
    return this.http.get<IResume[]>(url);
  }

  toggleDataSource() {
    this.useFakeData.set(!this.useFakeData());
  }

  private getInitialDataSource(): boolean {
    if (environment.production) return false;
    
    const stored = localStorage.getItem('resumeDataSource');
    return stored === 'fake';
  }

  private getDataUrl(useFakeData: boolean): string {
    if (useFakeData && !environment.production && 'fakeResumeDataUrl' in environment) {
      return (environment as any).fakeResumeDataUrl;
    }
    
    return environment.resumeDataUrl;
  }
}
