import { UserType } from './user-type.model';
import { CourseBackend } from './course-backend.model';
import { DrivingLicenceBackend } from './driving-licence-backend.model';

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
}
