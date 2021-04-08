import { AuthEffects } from '@modules/auth/store/auth.effects';
import { HomeEffects } from '@modules/home/store/home.effects';
import { UserEffects } from '@modules/user/store/user.effects';
import { UsersEffects } from '@modules/users/store/users.effects';
import { AppConstantsEffects } from './app-constants/app-constants.effects';

export const effects = [
  AuthEffects,
  HomeEffects,
  UserEffects,
  UsersEffects,
  AppConstantsEffects,
];