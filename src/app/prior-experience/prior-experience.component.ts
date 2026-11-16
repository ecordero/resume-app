import { Component, input } from '@angular/core';

@Component({
  selector: 'app-prior-experience',
  imports: [],
  templateUrl: './prior-experience.component.html',
  styleUrl: './prior-experience.component.css',
})
export class PriorExperienceComponent {
  title = input.required<string>();
  sectionId = input.required<string>();
}
