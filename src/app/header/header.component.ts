import { Component, Input } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-header',
  imports: [ProfileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) roles!: string[];
  @Input({ required: true }) resumeLocation!: string;
  @Input({ required: true }) profile!: string;
}
