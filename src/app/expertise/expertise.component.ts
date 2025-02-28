import { Component, Input, OnInit } from '@angular/core';
import { ISkills } from '../../resume.data.model';
import { ListSkillsComponent } from '../list-skills/list-skills.component';

@Component({
  selector: 'app-expertise',
  imports: [ListSkillsComponent],
  templateUrl: './expertise.component.html',
  styleUrl: './expertise.component.css',
})
export class ExpertiseComponent implements OnInit {
  @Input({ required: true }) skills!: ISkills;

  skillsKeys!: string[];

  ngOnInit() {
    this.skillsKeys = this.getSkillsKeys(this.skills);
    this.skillsKeys.forEach((k) => console.log(k));
  }

  getSkillsKeys(skills: ISkills): string[] {
    return Object.keys(skills) as string[];
  }
}
