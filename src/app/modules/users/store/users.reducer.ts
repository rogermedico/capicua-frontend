import { UsersState } from './users.state';
import * as UsersActions from './users.action';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from '@models/user.model';
import { Course } from '@models/course.model';

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
        else return updatedUser;
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* create course */
  on(UsersActions.UsersCourseCreate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* create course success */
  on(UsersActions.UsersCourseCreateSuccess, (state, { userId, course }) => {

    return {
      ...state,
      users: state.users.map((u: User) => {
        if (u.id != userId) {
          return u;
        }
        else {
          return {
            ...u,
            courses: [
              ...u.courses,
              course]
          }
        }
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* edit course */
  on(UsersActions.UsersCourseUpdate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* edit course success */
  on(UsersActions.UsersCourseUpdateSuccess, (state, { userId, course }) => {

    return {
      ...state,
      users: state.users.map((u: User) => {
        if (u.id != userId) {
          return u;
        }
        else {
          return {
            ...u,
            courses: u.courses.map(c => {
              if (c.id != course.id) return c;
              else return course;
            })
          }
        }
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* delete course */
  on(UsersActions.UsersCourseDelete, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* delete course success */
  on(UsersActions.UsersCourseDeleteSuccess, (state, { userId, courseId }) => {

    return {
      ...state,
      users: state.users.map((u: User) => {
        if (u.id != userId) {
          return u;
        }
        else {
          return {
            ...u,
            courses: u.courses.filter((c: Course) => c.id != courseId)
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
