import { AuthState } from './auth.state';
import * as AuthActions from './auth.action';
import { Action, createReducer, on } from '@ngrx/store';

/* the auth state starts with no one logged in */
const defaultAuthState: AuthState = {
  authInfo: null,
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
      loaded: false,
      error: null
    }
  }),

  /* login success */
  on(AuthActions.AuthLoginSuccess, (state, { authInfo }) => {
    return {
      ...state,
      authInfo: authInfo,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* logout */
  on(AuthActions.AuthLogout, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* logout success */
  on(AuthActions.AuthLogoutSuccess, state => {
    return {
      ...state,
      authInfo: null,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* send reset password email */
  on(AuthActions.AuthSendResetPasswordEmail, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* send reset password email success */
  on(AuthActions.AuthSendResetPasswordEmailSuccess, state => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* reset password */
  on(AuthActions.AuthResetPassword, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* reset password success */
  on(AuthActions.AuthResetPasswordSuccess, state => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* send verification email */
  on(AuthActions.AuthSendVerificationEmail, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* send verification email success */
  on(AuthActions.AuthSendVerificationEmailSuccess, state => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* verify email */
  on(AuthActions.AuthVerifyEmail, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* verify email success */
  on(AuthActions.AuthVerifyEmailSuccess, state => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* renew token */
  on(AuthActions.AuthRenewToken, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* renew token success */
  on(AuthActions.AuthRenewTokenSuccess, (state, { authInfo }) => {
    return {
      ...state,
      authInfo: authInfo,
      loading: false,
      loaded: true,
      error: null
    }
  }),


  /* error */
  on(AuthActions.AuthError, (state, { err }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: err
    }
  }),


);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
