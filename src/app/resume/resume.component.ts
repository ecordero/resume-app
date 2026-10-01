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
  selector: 'app-resume',
  imports: [
    HeaderComponent,
    ExpertiseComponent,
    ExperienceComponent,
    EducationComponent,
    ContactComponent,
    CommonModule,
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
  route = inject(ActivatedRoute);
  router = inject(Router);
  isDevelopment = !environment.production;

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

  toggleDataSource() {
    this.resumeDataService.toggleDataSource();
    this.getResumeData();
  }

  navigateToAtsColumns() {
    this.router.navigate(['/']);
  }

  navigateToAts() {
    this.router.navigate(['/ats']);
  }

  getToggleClasses() {
    const baseClasses = 'peer h-6 w-11 rounded-full bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[\'\'] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full';
    const colorClass = this.resumeDataService.useFakeData() ? 'peer-checked:bg-red-500' : 'bg-green-500';
    return `${baseClasses} ${colorClass}`;
  }
}