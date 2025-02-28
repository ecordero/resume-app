export interface IResume {
  name: string;
  title: string;
  roles: string[];
  location: string;
  profile: string;
  contact: IContact;
  expertise: ISkills;
  experience: IExperience[];
  education: IEducation[];
}

export interface ISkills {
  [index: string]: ISkill[];
}

export interface ISkill {
  name: string;
  rating: number;
}

export interface IContact {
  email: string;
  phone: string;
  linkedin: string;
}

export interface IExperience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isRecent: boolean;
  summary: string;
  accomplishments: string[];
}

export interface IEducation {
  certification?: string;
  degree?: string;
  institution: string;
  location: string;
}
