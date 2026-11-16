import { Component, input } from '@angular/core';
import { IExperience } from '../../resume.data.model';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent {
  experience = input.required<IExperience[]>();
  headerText = input('Experience');

  positionId(position: IExperience): string {
    return `position-${position.startDate.split(' ').join('')}-${position.endDate.split(' ').join('')}`;
  }
}
