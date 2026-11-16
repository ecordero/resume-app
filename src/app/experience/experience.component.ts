import { Component, computed, input } from '@angular/core';
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

  // A break after a flagged item is applied as a break before the next item,
  // so a flag on the last displayed item never adds a blank page
  breakBefore = computed(() =>
    this.experience().map(
      (_, index, items) => index > 0 && items[index - 1].pageBreakAfter === true,
    ),
  );

  positionId(position: IExperience): string {
    return `position-${position.startDate.split(' ').join('')}-${position.endDate.split(' ').join('')}`;
  }
}
