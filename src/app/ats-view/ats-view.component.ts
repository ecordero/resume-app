import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ExpertiseComponent } from '../expertise/expertise.component';
import { ExperienceComponent } from '../experience/experience.component';
import { EducationComponent } from '../education/education.component';
import { ResumeDataService } from '../resume-data.service';
import { ContactComponent } from '../contact/contact.component';
import { IExperience, IResume } from '../../resume.data.model';
import { NavComponent } from '../nav/nav.component';
import { hasContactData, hasEducationData } from '../resume-data.utils';
import { ExtracurricularsComponent } from '../extracurriculars/extracurriculars.component';

@Component({
  selector: 'app-ats-view',
  imports: [
    HeaderComponent,
    ExpertiseComponent,
    ExperienceComponent,
    EducationComponent,
    ContactComponent,
    NavComponent,
    ExtracurricularsComponent,
  ],
  templateUrl: './ats-view.component.html',
  styleUrl: './ats-view.component.css'
})
export class AtsViewComponent implements OnInit {
  resumeData: IResume | undefined;
  currentExperience: IExperience[] = [];
  previousExperience: IExperience[] = [];
  hasContact = false;
  hasEducation = false;
  elementRef = inject(ElementRef);
  resumeDataService = inject(ResumeDataService);

  ngOnInit() {
    this.elementRef.nativeElement.ownerDocument.body.className =
      'bg-white text-gray-900 print:bg-white';
    this.getResumeData();
  }

  getResumeData() {
    this.resumeDataService.getData().subscribe({
      next: (data) => {
        this.resumeData = data[0];
        this.currentExperience = this.resumeData.experience.filter(
          (exp) => exp.isRecent === true,
        );
        this.previousExperience = this.resumeData.experience.filter(
          (exp) => exp.isRecent !== true,
        );
        this.hasContact = hasContactData(this.resumeData.contact);
        this.hasEducation = hasEducationData(this.resumeData.education);
      },
      error: (error) => console.log('Error loading data:', error),
    });
  }
}
