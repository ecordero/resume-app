import { IDataset } from '../resume.data.model';

export const environment = {
  production: true,
  dataBasePath: '/data/',
  // Settings is dev only, so production always loads the first entry
  datasets: [
    { file: 'resume-data.json', label: 'Default' },
  ] as IDataset[],
};
