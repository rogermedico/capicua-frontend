import { AuthState } from './auth.state';
import * as AuthActions from './auth.action';
import { Action, createReducer, on } from '@ngrx/store';

/* the auth state starts with no one logged in */
const defaultAuthState: AuthState = {
  loginInfo: null,
  wrongCredentials: null,
  loading: false,
  loaded: true,
  error: null
};

const _authReducer = createReducer(defaultAuthState,

  /* login */
  on(AuthActions.AuthLogin, state => {
    return {
      ...state,
      loading: true,
      error: null
    }
  }),

  /* login success */
  on(AuthActions.AuthLoginSuccess, (state, { loginInfo }) => {
    return {
      ...state,
      loginInfo: loginInfo,
      wrongCredentials: false,
      loading: false,
      error: null
    }
  }),

  /* login error */
  on(AuthActions.AuthLoginError, (state, { err }) => {
    return {
      ...state,
      loginInfo: null,
      wrongCredentials: true,
      loading: false,
      error: err
    }
  }),

  /* logout */
  on(AuthActions.AuthLogout, state => {
    return {
      ...state,
      loading: true,
      error: null
    }
  }),

  /* logout success */
  on(AuthActions.AuthLogoutSuccess, state => {
    return {
      ...state,
      loginInfo: null,
      wrongCredentials: null,
      loading: false,
      error: null
    }
  }),

  /* logout error */
  on(AuthActions.AuthLogoutError, (state, { err }) => {
    return {
      ...state,
      loading: false,
      error: err
    }
  }),

  // /* register */
  // on(AuthActions.AuthRegister, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     error: null
  //   }
  // }),

  // /* register success */
  // on(AuthActions.AuthRegisterSuccess, (state, { user }) => {
  //   return {
  //     ...state,
  //     loginInfo: {
  //       username: user.email,
  //       password: user.password
  //     },
  //     wrongCredentials: false,
  //     loading: false,
  //     error: null
  //   }
  // }),

  // /* register error */
  // on(AuthActions.AuthRegisterError, (state, { err }) => {
  //   return {
  //     ...state,
  //     loginInfo: null,
  //     wrongCredentials: true,
  //     loading: false,
  //     error: err
  //   }
  // }),

);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
