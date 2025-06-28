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
  currentRoute = '';

  ngOnInit() {
    console.log('ResumeComponent ngOnInit');
    this.elementRef.nativeElement.ownerDocument.body.className =
      'bg-page text-gray-900 print:bg-transparent';

    this.updateCurrentRoute();
    this.getResumeData();
  }

  updateCurrentRoute() {
    this.currentRoute = this.route.snapshot.url.join('/');
  }

  getResumeData() {
    console.log('Getting resume data...');
    
    // Check if we're on the fake route
    const currentPath = this.route.snapshot.url.join('/');
    const useFakeData = currentPath === 'fake';
    
    console.log('Current path:', currentPath, 'Use fake data:', useFakeData);
    
    this.resumeDataService.getData(useFakeData).subscribe({
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

  navigateToReal() {
    this.router.navigate(['/']).then(() => {
      this.updateCurrentRoute();
      this.getResumeData();
    });
  }

  navigateToFake() {
    this.router.navigate(['/fake']).then(() => {
      this.updateCurrentRoute();
      this.getResumeData();
    });
  }
}