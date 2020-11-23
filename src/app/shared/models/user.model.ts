import { Education } from '@models/education.model';
import { Language } from '@models/language.model';
import { UserType } from '@models/user_type.model';

export interface User {
  id?: number;
  name: string;
  surname: string;
  dni?: string;
  type: UserType;
  email: string;
  password: string;
  birthDate?: string;
  phone?: number;
  education: Education[];
  languages: Language[];
  loggedIn: boolean;
}
