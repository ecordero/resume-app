import { Component, computed, input } from '@angular/core';
import { ISkills } from '../../resume.data.model';

@Component({
  selector: 'app-expertise',
  imports: [],
  templateUrl: './expertise.component.html',
  styleUrl: './expertise.component.css',
})
export class ExpertiseComponent {
  skills = input.required<ISkills>();
  isAtsView = input(false);
  useColumns = input(false);

  // Recomputed whenever skills changes, e.g., when switching data sets
  skillsKeys = computed(() => Object.keys(this.skills()));

  fourColumnSkills = computed(() => {
    const skills = this.skills();
    const columns: string[][] = [[], [], [], []];

    // Flatten all skills from all groups, filtering by isUsed
    const allSkills = this.skillsKeys().flatMap((key) =>
      skills[key].filter((skill) => skill.isUsed).map((skill) => skill.name),
    );

    // Calculate skills per column for vertical distribution
    const itemsPerColumn = Math.ceil(allSkills.length / 4);

    // Distribute skills vertically (down columns, then across)
    allSkills.forEach((skillName, index) => {
      const columnIndex = Math.floor(index / itemsPerColumn);
      columns[columnIndex].push(skillName);
    });

    return columns;
  });

  getSkillsAsCommaSeparatedList(key: string): string {
    return this.skills()[key]
      .filter((skill) => skill.isUsed)
      .map((skill) => skill.name)
      .join(', ');
  }
}
