import { AuthEffects } from '@modules/auth/store/auth.effects';
import { UserEffects } from '@modules/user/store/user.effects';
import { UsersEffects } from '@modules/users/store/users.effects';
import { UserTypesEffects } from './user-types/user-types.effects';

export const effects = [
  AuthEffects,
  UserEffects,
  UsersEffects,
  UserTypesEffects,
];