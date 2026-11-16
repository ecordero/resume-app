import { Component, input } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-header',
  imports: [ProfileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  name = input.required<string>();
  title = input.required<string>();
  roles = input.required<string[]>();
  resumeLocation = input.required<string>();
  profile = input.required<string>();
}
