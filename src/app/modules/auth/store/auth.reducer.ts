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
      authInfo: null,
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

  /* login error */
  // on(AuthActions.AuthLoginError, (state, { err }) => {
  //   return {
  //     ...state,
  //     authInfo: null,
  //     loading: false,
  //     loaded: true,
  //     error: err
  //   }
  // }),

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

  /* logout error */
  // on(AuthActions.AuthLogoutError, (state, { err }) => {
  //   return {
  //     ...state,
  //     loading: false,
  //     loaded: true,
  //     error: err
  //   }
  // }),

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

  /* send reset password email error */
  // on(AuthActions.AuthSendResetPasswordEmailError, (state, { err }) => {
  //   return {
  //     ...state,
  //     loading: false,
  //     loaded: true,
  //     error: err
  //   }
  // }),

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

  /* reset password error */
  // on(AuthActions.AuthResetPasswordError, (state, { err }) => {
  //   return {
  //     ...state,
  //     loading: false,
  //     loaded: true,
  //     error: err
  //   }
  // }),

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

  /* send verification email error */
  // on(AuthActions.AuthSendVerificationEmailError, (state, { err }) => {
  //   return {
  //     ...state,
  //     loading: false,
  //     loaded: true,
  //     error: err
  //   }
  // }),

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

  /* verify email error */
  // on(AuthActions.AuthVerifyEmailError, (state, { err }) => {
  //   return {
  //     ...state,
  //     loading: false,
  //     loaded: true,
  //     error: err
  //   }
  // }),

  /* error */
  on(AuthActions.AuthError, (state, { err }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: err
    }
  }),

  // /* register */
  // on(AuthActions.AuthRegister, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     loaded: false,
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
  //     loaded: true,
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
  //     loaded: true,
  //     error: err
  //   }
  // }),

);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
