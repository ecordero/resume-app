import { IDataset } from '../resume.data.model';

export const environment = {
  production: false,
  dataBasePath: '/data/',
  // Selectable resume data sets. The first entry is the default.
  datasets: [
    { file: 'resume-data.json', label: 'Default' },
    { file: 'joe-cordero-seap-resume.json', label: 'Joe Cordero (SEAP)' },
  ] as IDataset[],
  fakeResumeDataUrl: '/data/resume-data-dev.json',
};
