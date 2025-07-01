import { Component, Input, OnInit } from '@angular/core';
import { ISkills } from '../../resume.data.model';

@Component({
  selector: 'app-expertise',
  imports: [],
  templateUrl: './expertise.component.html',
  styleUrl: './expertise.component.css',
})
export class ExpertiseComponent implements OnInit {
  @Input({ required: true }) skills!: ISkills;
  @Input() isAtsView: boolean = false;

  skillsKeys!: string[];
  ratingScale = 4;

  ngOnInit() {
    this.skillsKeys = this.getSkillsKeys(this.skills);
    this.skillsKeys.forEach((k) => console.log(k));
  }

  getSkillsKeys(skills: ISkills): string[] {
    return Object.keys(skills) as string[];
  }

  getSkillsAsCommaSeparatedList(key: string): string {
    return this.skills[key].map(skill => skill.name).join(', ');
  }

  private get itemsPerColumn(): number {
    return Math.ceil(this.skillsKeys.length / 3);
  }

  get firstColumnKeys(): string[] {
    return this.skillsKeys.slice(0, this.itemsPerColumn);
  }

  get secondColumnKeys(): string[] {
    return this.skillsKeys.slice(this.itemsPerColumn, this.itemsPerColumn * 2);
  }

  get thirdColumnKeys(): string[] {
    return this.skillsKeys.slice(this.itemsPerColumn * 2);
  }

  skillLevel(n: number): string[] {
    const skillLevel: string[] = new Array(n).fill('*');
    return skillLevel;
  }
  
  skillLevelFiller(n: number): string[] {
    const skillLevel: string[] = new Array(this.ratingScale - n).fill('*');
    return skillLevel;
  }
}
