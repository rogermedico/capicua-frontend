import { EDUCATION_TYPE, EDUCATION_TYPE_CICLE, EDUCATION_TYPE_UNIVERSITY } from '@constants/education.constant';
import { LANGUAGES, LANGUAGE_LEVELS } from '@constants/language.constant';
import { User } from "@models/user.model";

export const USERS_MOCK_DATA: User[] = [
  {
    id: 1,
    name: 'roger',
    surname: 'medico piqué',
    type: {
      name: 'admin',
      rank: 1
    },
    email: 'rmedico@uoc.edu',
    password: '12341234',
    loggedIn: false,
    education: [],
    languages: []
  },
];