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

  /* create education */
  on(UsersActions.UsersEducationCreate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* create education success */
  on(UsersActions.UsersEducationCreateSuccess, (state, { userId, education }) => {

    return {
      ...state,
      users: state.users.map((u: User) => {
        if (u.id != userId) {
          return u;
        }
        else {
          return {
            ...u,
            educations: [
              ...u.educations,
              education]
          }
        }
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* edit education */
  on(UsersActions.UsersEducationUpdate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* edit education success */
  on(UsersActions.UsersEducationUpdateSuccess, (state, { userId, education }) => {

    return {
      ...state,
      users: state.users.map((u: User) => {
        if (u.id != userId) {
          return u;
        }
        else {
          return {
            ...u,
            educations: u.educations.map(e => {
              if (e.id != education.id) return e;
              else return education;
            })
          }
        }
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* delete education */
  on(UsersActions.UsersEducationDelete, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* delete education success */
  on(UsersActions.UsersEducationDeleteSuccess, (state, { userId, educationId }) => {

    return {
      ...state,
      users: state.users.map((u: User) => {
        if (u.id != userId) {
          return u;
        }
        else {
          return {
            ...u,
            educations: u.educations.filter((e: Education) => e.id != educationId)
          }
        }
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* create language */
  on(UsersActions.UsersLanguageCreate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* create language success */
  on(UsersActions.UsersLanguageCreateSuccess, (state, { userId, language }) => {

    return {
      ...state,
      users: state.users.map((u: User) => {
        if (u.id != userId) {
          return u;
        }
        else {
          return {
            ...u,
            languages: [
              ...u.languages,
              language]
          }
        }
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* edit language */
  on(UsersActions.UsersLanguageUpdate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* edit language success */
  on(UsersActions.UsersLanguageUpdateSuccess, (state, { userId, language }) => {

    return {
      ...state,
      users: state.users.map((u: User) => {
        if (u.id != userId) {
          return u;
        }
        else {
          return {
            ...u,
            languages: u.languages.map(e => {
              if (e.id != language.id) return e;
              else return language;
            })
          }
        }
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* delete language */
  on(UsersActions.UsersLanguageDelete, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* delete language success */
  on(UsersActions.UsersLanguageDeleteSuccess, (state, { userId, languageId }) => {

    return {
      ...state,
      users: state.users.map((u: User) => {
        if (u.id != userId) {
          return u;
        }
        else {
          return {
            ...u,
            languages: u.languages.filter((l: Language) => l.id != languageId)
          }
        }
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

  /* update avatar */
  on(UsersActions.UsersAvatarUpdate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* update avatar success */
  on(UsersActions.UsersAvatarUpdateSuccess, (state, { userId, avatar }) => {

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

  /* delete avatar */
  on(UsersActions.UsersAvatarDelete, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* delete avatar success */
  on(UsersActions.UsersAvatarDeleteSuccess, (state, { userId }) => {

    return {
      ...state,
      users: state.users.map((u: User) => {
        if (u.id != userId) {
          return u;
        }
        else {
          return {
            ...u,
            avatar: false
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
