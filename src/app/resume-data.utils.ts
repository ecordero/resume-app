import { IContact, IEducation } from '../resume.data.model';

// Contact counts as empty when every value is blank
export function hasContactData(contact: IContact): boolean {
  return Object.values(contact).some((value) => value.trim() !== '');
}

export function hasEducationData(education: IEducation[]): boolean {
  return education.length > 0;
}
