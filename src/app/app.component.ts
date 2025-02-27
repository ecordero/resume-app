import { Component, ElementRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { ExpertiseComponent } from './expertise/expertise.component';
import { ExperienceComponent } from './experience/experience.component';
import { PriorExperienceComponent } from './prior-experience/prior-experience.component';
import { EducationComponent } from './education/education.component';
import { ResumeDataService } from './resume-data.service';
import { ContactComponent } from './contact/contact.component';
import { IExperience, IResume } from '../resume.data.model';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    ExpertiseComponent,
    ExperienceComponent,
    EducationComponent,
    ContactComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'resume-app';
  resumeData: IResume | undefined;
  currentExperience: IExperience[] = [];
  previousExperience: IExperience[] = [];

  constructor(
    private elementRef: ElementRef,
    private resumeDataService: ResumeDataService,
  ) {}

  ngOnInit() {
    console.log('ngOnInit');
    this.elementRef.nativeElement.ownerDocument.body.className =
      'bg-page text-gray-900 print:bg-transparent';

    this.getResumeData();
  }
  getResumeData() {
    this.resumeDataService.getData().subscribe((data: IResume[]) => {
      this.resumeData = data[0];
      this.currentExperience = this.resumeData.experience.filter(
        (exp) => exp.isRecent === true,
      );
      this.previousExperience = this.resumeData.experience.filter(
        (exp) => exp.isRecent !== true,
      );
      console.log('this.resumeData', this.resumeData);
      console.log('this.resumeData.name', this.resumeData.name);
      console.log('this.resumeData.location', this.resumeData.location);
    });
  }
}
