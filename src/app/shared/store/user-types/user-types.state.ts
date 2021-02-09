import { UserType } from '@models/user-type.model';

export interface UserTypesState {
  userTypes: UserType[];
  loading: boolean;
  loaded: boolean;
  error: Error;
}