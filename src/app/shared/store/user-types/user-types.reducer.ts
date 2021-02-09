import * as UserTypesActions from './user-types.action';
import { Action, createReducer, on } from '@ngrx/store';
import { UserTypesState } from './user-types.state';

/* the auth state starts with no one logged in */
const defaultUserTypesState: UserTypesState = {
  userTypes: null,
  loading: false,
  loaded: true,
  error: null
};

const _userTypesReducer = createReducer(defaultUserTypesState,

  /* get data */
  on(UserTypesActions.UserTypesGetAll, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* get data success */
  on(UserTypesActions.UserTypesGetAllSuccess, (state, { userTypes }) => {
    return {
      ...state,
      userTypes: userTypes,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* reset data */
  on(UserTypesActions.UserTypesReset, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* reset data success */
  on(UserTypesActions.UserTypesResetSuccess, state => {
    return {
      ...state,
      userTypes: null,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* error */
  on(UserTypesActions.UserTypesError, (state, { err }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: err
    }
  }),


);

export function userTypesReducer(state: UserTypesState | undefined, action: Action) {
  return _userTypesReducer(state, action);
}
