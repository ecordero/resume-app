import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResume } from '../resume.data.model';

@Injectable({
  providedIn: 'root',
})
export class ResumeDataService {
  private resumeDataUrl = '/data/resume-data.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<IResume[]> {
    return this.http.get<IResume[]>(this.resumeDataUrl);
  }
}
