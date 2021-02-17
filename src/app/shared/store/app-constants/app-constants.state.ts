import { CourseType } from '@models/course.model';
import { UserType } from '@models/user-type.model';

export interface AppConstantsState {
  userTypes: UserType[];
  courseTypes: CourseType[];
  loading: boolean;
  loaded: boolean;
  error: Error;
}