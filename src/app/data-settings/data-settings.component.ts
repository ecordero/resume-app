import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  output,
  viewChild,
} from '@angular/core';
import { ResumeDataService } from '../resume-data.service';

@Component({
  selector: 'app-data-settings',
  templateUrl: './data-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataSettingsComponent {
  resumeDataService = inject(ResumeDataService);

  // Emits after the selected data set changes so the host view can refetch
  datasetChange = output<void>();

  dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  open() {
    this.dialog().nativeElement.showModal();
  }

  close() {
    this.dialog().nativeElement.close();
  }

  onSelect(event: Event) {
    const file = (event.target as HTMLSelectElement).value;
    this.resumeDataService.selectDataset(file);
    this.datasetChange.emit();
  }
}
