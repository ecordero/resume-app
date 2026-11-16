import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IExtracurricular } from '../../resume.data.model';

@Component({
  selector: 'app-extracurriculars',
  templateUrl: './extracurriculars.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExtracurricularsComponent {
  extracurriculars = input.required<IExtracurricular[]>();
}
