import { Component, Input } from '@angular/core';
import { IExperience } from '../../resume.data.model';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent {
  @Input({ required: true }) experience!: IExperience[];
  @Input({ required: false }) headerText = 'Experience';
}
