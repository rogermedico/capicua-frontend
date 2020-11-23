import { EDUCATION_TYPE, EDUCATION_TYPE_UNIVERSITY, EDUCATION_TYPE_CICLE } from '@constants/education.constant';

export interface Education {
  type: EDUCATION_TYPE;
  level: EDUCATION_TYPE_UNIVERSITY | EDUCATION_TYPE_CICLE;
  name: string;
  university: string;
  finishDate?: string;
}
