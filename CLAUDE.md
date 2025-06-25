# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **`npm start`** - Start development server with auto-open browser
- **`npm run build`** - Production build  
- **`npm run watch`** - Development build with file watching
- **`npm test`** - Run unit tests with Karma/Jasmine

## Application Architecture

This is an Angular 19 personal resume application with a data-driven architecture using TailwindCSS for styling.

### Data Flow Pattern
- Resume data is stored in `public/data/resume-data.json`
- `ResumeDataService` (src/app/resume-data.service.ts:9) fetches data via HTTP client
- `AppComponent` (src/app/app.component.ts:26) subscribes to service and processes data
- Data flows down through component tree via Input properties

### Key Interfaces
All data models are defined in `src/resume.data.model.ts`:
- `IResume` - Main resume structure containing all sections
- `IExperience` - Work experience with `isRecent` boolean for filtering current vs previous roles
- `ISkills` - Expertise organized by categories with skill ratings
- `IContact`, `IEducation` - Contact and education information

### Experience Filtering Logic
The app separates work experience using the `isRecent` flag:
- Current experience: `isRecent: true` (displayed in main experience section)
- Previous experience: `isRecent: false` (available for abbreviated resume versions)

This filtering happens in `AppComponent.getResumeData()` (src/app/app.component.ts:48).

### Component Structure
- Root `AppComponent` manages data and filters experience
- Child components are purely presentational: `HeaderComponent`, `ExpertiseComponent`, `ExperienceComponent`, `EducationComponent`, `ContactComponent`
- Uses modern Angular patterns: `inject()` for DI, `takeUntilDestroyed()` for subscription management

### Styling
- TailwindCSS 4.0 with custom theme variables in `src/styles.css`
- Print-optimized styles using Tailwind print modifiers
- Custom blue color scheme for professional appearance

## Content Updates

To modify resume content, edit `public/data/resume-data.json`. The `isRecent` property on experience items controls whether they appear in the main experience section, allowing easy comparison between full and abbreviated resume versions.