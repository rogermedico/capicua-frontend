import { UserType } from '@models/user-type.model';
import { Address } from '@models/address.model';
import { Course, CourseBackend } from './course.model';
import { DrivingLicence, DrivingLicenceBackend } from './driving-licence.model';
import { Education, EducationBackend } from './education.model';
import { Language, LanguageBackend } from './language.model';
import { SafeResourceUrl } from '@angular/platform-browser';
import { UserDocument } from './document.model';

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  userType: UserType;
  dni: string;
  birthDate: Date;
  address: Address;
  phone: string;
  actualPosition: string;
  courses: Course[];
  drivingLicences: DrivingLicence[];
  educations: Education[];
  languages: Language[];
  emailVerified: boolean;
  deactivated: boolean;
  socialSecurityNumber: string;
  bankAccount: string;
  avatarFile: SafeResourceUrl | boolean;
  documents: UserDocument[];

}

export interface UserBackend {
  id: number;
  name: string;
  surname: string;
  email: string;
  user_type: UserType;
  dni: string;
  birth_date: string;
  address_street: string;
  address_number: string;
  address_city: string;
  address_cp: string;
  address_country: string;
  phone: string;
  actual_position: string;
  courses: CourseBackend[];
  driving_licences: DrivingLicenceBackend[];
  educations: EducationBackend[];
  languages: LanguageBackend[];
  email_verified_at: string;
  deactivated: boolean;
  social_security_number: string;
  bank_account: string;
  avatar_file: {
    avatar: string,
    extension: string
  } | boolean;
  dni_file: boolean;
  sex_offense_certificate_file: boolean;
}

export interface NewUser {
  name: string;
  surname: string;
  email: string;
  user_type_id: number;
  password: string;
  // dni: string;
  // birth_date: string;
  // address_street: string;
  // address_number: string;
  // address_city: string;
  // address_cp: string;
  // address_country: string;
  // phone: string;
  // actual_position: string;
  // driving_licences: string;
}

