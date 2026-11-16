import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ExpertiseComponent } from '../expertise/expertise.component';
import { ExperienceComponent } from '../experience/experience.component';
import { EducationComponent } from '../education/education.component';
import { ResumeDataService } from '../resume-data.service';
import { ContactComponent } from '../contact/contact.component';
import { IExperience, IResume } from '../../resume.data.model';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-resume',
  imports: [
    HeaderComponent,
    ExpertiseComponent,
    ExperienceComponent,
    EducationComponent,
    ContactComponent,
    NavComponent,
  ],
  templateUrl: './resume.component.html',
  styleUrls: []
})
export class ResumeComponent implements OnInit {
  resumeData: IResume | undefined;
  currentExperience: IExperience[] = [];
  previousExperience: IExperience[] = [];
  elementRef = inject(ElementRef);
  resumeDataService = inject(ResumeDataService);

  ngOnInit() {
    console.log('ResumeComponent ngOnInit');
    this.elementRef.nativeElement.ownerDocument.body.className =
      'bg-page text-gray-900 print:bg-transparent';

    this.getResumeData();
  }

  getResumeData() {
    console.log('Getting resume data...');
    
    this.resumeDataService.getData().subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.resumeData = data[0];
        this.currentExperience = this.resumeData.experience.filter(
          (exp) => exp.isRecent === true,
        );
        this.previousExperience = this.resumeData.experience.filter(
          (exp) => exp.isRecent !== true,
        );
        console.log('Resume data processed, resumeData:', this.resumeData);
      },
      error: (error) => console.log('Error loading data:', error),
    });
  }
}
