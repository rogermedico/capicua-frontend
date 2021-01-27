import { UserType } from '@models/user-type.model';
import { Address } from '@models/address.model';
import { Course } from './course.model';

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
}
