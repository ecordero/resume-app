import { Routes } from '@angular/router';
import { ResumeComponent } from './resume/resume.component';
import { PrintViewComponent } from './print-view/print-view.component';

export const routes: Routes = [
  { path: '', component: ResumeComponent },
  { path: 'fake', component: ResumeComponent },
  { path: 'print', component: PrintViewComponent },
  { path: '**', redirectTo: '' }
];
