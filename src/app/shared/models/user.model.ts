import { UserType } from '@models/user-type.model';
import { Address } from '@models/address.model';
import { SummerCampTitle } from './summer-camp-title.model';

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
  summerCampTitles: SummerCampTitle[];
}
