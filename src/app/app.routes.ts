import { Routes } from '@angular/router';
import { ResumeComponent } from './resume/resume.component';
import { AtsViewComponent } from './ats-view/ats-view.component';
import { AtsColumnsViewComponent } from './ats-columns-view/ats-columns-view.component';

export const routes: Routes = [
  { path: '', component: AtsColumnsViewComponent },
  { path: 'ats', component: AtsViewComponent },
  { path: 'web', component: ResumeComponent },
  { path: '**', redirectTo: '' }
];
