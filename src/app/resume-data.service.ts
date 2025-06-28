import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResume } from '../resume.data.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResumeDataService {
  http = inject(HttpClient);

  getData(useFakeData: boolean = false): Observable<IResume[]> {
    const url = this.getDataUrl(useFakeData);
    console.log('ResumeDataService.getData() called, useFakeData:', useFakeData, 'URL:', url);
    return this.http.get<IResume[]>(url);
  }

  private getDataUrl(useFakeData: boolean): string {
    if (useFakeData && !environment.production && 'fakeResumeDataUrl' in environment) {
      return (environment as any).fakeResumeDataUrl;
    }
    
    return environment.resumeDataUrl;
  }
}
