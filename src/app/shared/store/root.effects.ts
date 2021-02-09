import { AuthEffects } from '@modules/auth/store/auth.effects';
import { UserEffects } from '@modules/user/store/user.effects';
import { UsersEffects } from '@modules/users/store/users.effects';

export const effects = [
  AuthEffects,
  UserEffects,
  UsersEffects
];