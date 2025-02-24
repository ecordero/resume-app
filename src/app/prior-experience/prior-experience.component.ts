import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-prior-experience',
  imports: [],
  templateUrl: './prior-experience.component.html',
  styleUrl: './prior-experience.component.css',
})
export class PriorExperienceComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) sectionId!: string;
}
