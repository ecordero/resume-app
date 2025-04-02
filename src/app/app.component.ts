import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ExpertiseComponent } from './expertise/expertise.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { ResumeDataService } from './resume-data.service';
import { ContactComponent } from './contact/contact.component';
import { IExperience, IResume } from '../resume.data.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

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
  title = 'Edward Cordero - Resume';
  resumeData: IResume | undefined;
  currentExperience: IExperience[] = [];
  previousExperience: IExperience[] = [];
  elementRef = inject(ElementRef);
  resumeDataService = inject(ResumeDataService);
  resumeData$: Observable<IResume[]>;

  constructor() {
    this.resumeData$ = this.resumeDataService
      .getData()
      .pipe(takeUntilDestroyed());
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.elementRef.nativeElement.ownerDocument.body.className =
      'bg-page text-gray-900 print:bg-transparent';

    this.getResumeData();
  }
  getResumeData() {
    this.resumeData$.subscribe({
      next: (data) => {
        this.resumeData = data[0];
        this.currentExperience = this.resumeData.experience.filter(
          (exp) => exp.isRecent === true,
        );
        this.previousExperience = this.resumeData.experience.filter(
          (exp) => exp.isRecent !== true,
        );
      },
      error: (error) => console.log(error),
    });
  }
}
