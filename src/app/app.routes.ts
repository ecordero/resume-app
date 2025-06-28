import { Routes } from '@angular/router';
import { ResumeComponent } from './resume/resume.component';

export const routes: Routes = [
  { path: '', component: ResumeComponent },
  { path: 'fake', component: ResumeComponent },
  { path: '**', redirectTo: '' }
];
