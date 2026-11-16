import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ResumeDataService } from '../resume-data.service';
import { DataSettingsComponent } from '../data-settings/data-settings.component';
import { environment } from '../../environments/environment';

interface INavLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, DataSettingsComponent],
  templateUrl: './nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  resumeDataService = inject(ResumeDataService);
  isDevelopment = !environment.production;

  // Emits after the real/fake source or data set changes so the host view can refetch
  dataSourceChange = output<void>();

  readonly links: INavLink[] = [
    { path: '/', label: 'ATS Skill Cols' },
    { path: '/ats', label: 'ATS Skill Groups' },
    { path: '/web', label: 'Web' },
  ];

  toggleDataSource() {
    this.resumeDataService.toggleDataSource();
    this.dataSourceChange.emit();
  }
}
