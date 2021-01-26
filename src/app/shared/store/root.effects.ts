import { AuthEffects } from '@modules/auth/store/auth.effects';
import { UserEffects } from '../../modules/user/store/user.effects';

export const effects = [
  AuthEffects,
  UserEffects,
];