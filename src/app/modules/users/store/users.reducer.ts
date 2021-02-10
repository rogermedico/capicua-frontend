import { UsersState } from './users.state';
import * as UsersActions from './users.action';
import { Action, createReducer, on } from '@ngrx/store';

/* the auth state starts with no one logged in */
const defaultUsersState: UsersState = {
  users: null,
  loading: false,
  loaded: true,
  error: null
};

const _usersReducer = createReducer(defaultUsersState,

  /* get data */
  on(UsersActions.UsersGetAll, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* get data success */
  on(UsersActions.UsersGetAllSuccess, (state, { users }) => {
    return {
      ...state,
      users: users,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* reset data */
  on(UsersActions.UsersReset, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* reset data success */
  on(UsersActions.UsersResetSuccess, state => {
    return {
      ...state,
      users: null,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* create user */
  on(UsersActions.UsersCreate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* create user success */
  on(UsersActions.UsersCreateSuccess, (state, { user }) => {
    console.log('reducer usercreatesuccess', user)
    return {
      ...state,
      users: [...state.users, user],
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* error */
  on(UsersActions.UsersError, (state, { err }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: err
    }
  }),


);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return _usersReducer(state, action);
}
