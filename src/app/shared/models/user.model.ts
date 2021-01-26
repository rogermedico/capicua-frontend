import { UserType } from '@models/user-type.model';

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  userType: UserType;
  dni?: string;
  birthDate?: Date;
  address?: string;
  phone?: number;
}
