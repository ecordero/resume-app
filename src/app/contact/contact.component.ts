import { Component, Input } from '@angular/core';
import { IContact } from '../../resume.data.model';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  @Input({ required: true }) contact!: IContact;
}
