import { Component, computed, input } from '@angular/core';
import { ISkill } from '../../resume.data.model';

@Component({
  selector: 'app-list-skills',
  imports: [],
  templateUrl: './list-skills.component.html',
  styleUrl: './list-skills.component.css',
})
export class ListSkillsComponent {
  list = input.required<ISkill[]>();
  hideRatings = input(false);
  ratingScale = 4;

  skillLevel(n: number): string[] {
    const skillLevel: string[] = new Array(n).fill('*');
    return skillLevel;
  }
  skillLevelFiller(n: number): string[] {
    const skillLevel: string[] = new Array(this.ratingScale - n).fill('*');
    return skillLevel;
  }

  skillsAsCommaSeparatedList = computed(() =>
    this.list().map((skill) => skill.name).join(', '),
  );
}
