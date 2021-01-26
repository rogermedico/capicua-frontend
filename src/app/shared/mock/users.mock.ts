import { EDUCATION_TYPE, EDUCATION_TYPE_CICLE, EDUCATION_TYPE_UNIVERSITY } from '@constants/education.constant';
import { LANGUAGES, LANGUAGE_LEVELS } from '@constants/language.constant';
import { User } from "@models/user.model";

export const USERS_MOCK_DATA: User[] = [
  {
    id: 1,
    name: 'roger',
    surname: 'medico piqué',
    userType: {
      id: 1,
      name: 'admin',
      rank: 1
    },
    email: 'admin@gmail.com',
    password: 'password',
  },
  {
    id: 2,
    name: 'roger',
    surname: 'medico piqué',
    userType: {
      id: 3,
      name: 'worker',
      rank: 3
    },
    email: 'worker@gmail.com',
    password: 'password',
  },
  {
    id: 3,
    name: 'roger',
    surname: 'medico piqué',
    userType: {
      id: 2,
      name: 'moderator',
      rank: 2
    },
    email: 'moderator@gmail.com',
    password: 'password',
  },
];