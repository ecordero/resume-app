import { Component, Input } from '@angular/core';
import { IExperience, ISkills } from '../../resume.data.model';

@Component({
  selector: 'app-expertise',
  imports: [],
  templateUrl: './expertise.component.html',
  styleUrl: './expertise.component.css',
})
export class ExpertiseComponent {
  @Input({ required: true }) skills!: ISkills;
  ratingScale = 4;

  skillLevel(n: number): string[] {
    const skillLevel: string[] = new Array(n).fill('*');
    return skillLevel;
  }
  skillLevelFiller(n: number): string[] {
    const skillLevel: string[] = new Array(this.ratingScale - n).fill('*');
    return skillLevel;
  }
}
