import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResume } from '../resume.data.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResumeDataService {
  private resumeDataUrl = environment.resumeDataUrl;

  http = inject(HttpClient);

  getData(): Observable<IResume[]> {
    return this.http.get<IResume[]>(this.resumeDataUrl);
  }
}
