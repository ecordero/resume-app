import { Component, input } from '@angular/core';
import { IEducation } from '../../resume.data.model';

@Component({
  selector: 'app-education',
  imports: [],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
})
export class EducationComponent {
  education = input.required<IEducation[]>();
}
