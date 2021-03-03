import { UsersState } from './users.state';
import * as UsersActions from './users.action';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from '@models/user.model';
import { Course } from '@models/course.model';
import { Education } from '@models/education.model';
import { Language } from '@models/language.model';

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
      users: state.users === null ? users : users.map(newUser => {
        const oldUser = state.users.find(oldUser => oldUser.id === newUser.id);
        if (typeof oldUser.avatar != 'boolean') {
          return {
            ...newUser,
            avatar: oldUser.avatar
          }
        }
        else {
          return newUser;
        }
      }),
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

  /* update user */
  on(UsersActions.UsersProfileUpdate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* update user success */
  on(UsersActions.UsersProfileUpdateSuccess, (state, { updatedUser }) => {

    return {
      ...state,
      users: state.users.map((u: User) => {
        if (u.id != updatedUser.id) return u;
        else return {
          ...updatedUser,
          avatar: u.avatar
        };
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* get avatar */
  on(UsersActions.UsersAvatarGet, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* get avatar success */
  on(UsersActions.UsersAvatarGetSuccess, (state, { userId, avatar }) => {

    return {
      ...state,
      users: state.users.map((u: User) => {
        if (u.id != userId) {
          return u;
        }
        else {
          return {
            ...u,
            avatar: avatar
          }
        }
      }),
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
