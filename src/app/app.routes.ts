import { Routes } from '@angular/router';
import { ResumeComponent } from './resume/resume.component';
import { AtsViewComponent } from './ats-view/ats-view.component';

export const routes: Routes = [
  { path: '', component: ResumeComponent },
  { path: 'ats', component: AtsViewComponent },
  { path: '**', redirectTo: '' }
];
