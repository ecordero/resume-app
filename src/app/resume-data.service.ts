import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, effect } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataset, IResume } from '../resume.data.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResumeDataService {
  http = inject(HttpClient);

  // Must be declared before selectedFile, which reads it during initialization
  readonly datasets: IDataset[] = environment.datasets;

  // Signal for data source state with localStorage persistence
  useFakeData = signal(this.getInitialDataSource());

  // Selected real data set file, with localStorage persistence
  selectedFile = signal(this.getInitialDataset());

  constructor() {
    // Persist data source changes to localStorage
    effect(() => {
      if (!environment.production) {
        localStorage.setItem('resumeDataSource', this.useFakeData() ? 'fake' : 'real');
      }
    });

    // Persist data set selection to localStorage
    effect(() => {
      if (!environment.production) {
        localStorage.setItem('resumeDataset', this.selectedFile());
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

  selectDataset(file: string) {
    this.selectedFile.set(file);
  }

  private getInitialDataSource(): boolean {
    if (environment.production) return false;

    const stored = localStorage.getItem('resumeDataSource');
    return stored === 'fake';
  }

  private getInitialDataset(): string {
    const fallback = this.datasets[0].file;
    if (environment.production) return fallback;

    // Ignore a stored file that has since been removed from the list
    const stored = localStorage.getItem('resumeDataset');
    return this.datasets.find((d) => d.file === stored)?.file ?? fallback;
  }

  private getDataUrl(useFakeData: boolean): string {
    // Fake data takes priority over the selected data set
    if (useFakeData && !environment.production && 'fakeResumeDataUrl' in environment) {
      return (environment as any).fakeResumeDataUrl;
    }

    return `${environment.dataBasePath}${this.selectedFile()}`;
  }
}
