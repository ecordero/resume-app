import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ExpertiseComponent } from '../expertise/expertise.component';
import { ExperienceComponent } from '../experience/experience.component';
import { EducationComponent } from '../education/education.component';
import { ResumeDataService } from '../resume-data.service';
import { ContactComponent } from '../contact/contact.component';
import { IExperience, IResume } from '../../resume.data.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-print-view',
  imports: [
    HeaderComponent,
    ExpertiseComponent,
    ExperienceComponent,
    EducationComponent,
    ContactComponent,
    CommonModule,
  ],
  templateUrl: './print-view.component.html',
  styleUrl: './print-view.component.css'
})
export class PrintViewComponent implements OnInit {
  resumeData: IResume | undefined;
  currentExperience: IExperience[] = [];
  previousExperience: IExperience[] = [];
  elementRef = inject(ElementRef);
  resumeDataService = inject(ResumeDataService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  isDevelopment = !environment.production;

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
      },
      error: (error) => console.log('Error loading data:', error),
    });
  }

  toggleDataSource() {
    this.resumeDataService.toggleDataSource();
    this.getResumeData();
  }

  navigateBack() {
    this.router.navigate(['/']);
  }
}
