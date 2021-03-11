import { UserState } from './user.state';
import * as UserActions from './user.action';
import { Action, createReducer, on } from '@ngrx/store';
import { Course } from '@models/course.model';
import { Education } from '@models/education.model';
import { Language } from '@models/language.model';
import { UserDocument } from '@models/document.model';
import { USER_DOCUMENTS } from '@constants/documents.constant';

/* the auth state starts with no one logged in */
const defaultUserState: UserState = {
  user: null,
  loading: false,
  loaded: true,
  error: null
};

const _userReducer = createReducer(defaultUserState,

  /* get data */
  on(UserActions.UserGetData, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* get data success */
  on(UserActions.UserGetDataSuccess, (state, { user }) => {
    return {
      ...state,
      user: {
        ...user,
        documents: state.user == null ? user.documents : state.user.documents
      },
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* reset data */
  on(UserActions.UserResetData, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* reset data success */
  on(UserActions.UserResetDataSuccess, state => {
    return {
      ...state,
      user: null,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* profile update */
  on(UserActions.UserProfileUpdate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* profile update success */
  on(UserActions.UserProfileUpdateSuccess, (state, { updatedUser }) => {

    return {
      ...state,
      user: updatedUser,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* create course */
  on(UserActions.UserCourseCreate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* create course success */
  on(UserActions.UserCourseCreateSuccess, (state, { course }) => {

    return {
      ...state,
      user: {
        ...state.user,
        courses: [
          ...state.user.courses,
          course
        ]
      },
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* edit course */
  on(UserActions.UserCourseUpdate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* edit course success */
  on(UserActions.UserCourseUpdateSuccess, (state, { course }) => {

    return {
      ...state,
      user: {
        ...state.user,
        courses: state.user.courses.map((c: Course) => {
          if (c.id != course.id) return c;
          else return course;
        })
      },
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* delete course */
  on(UserActions.UserCourseDelete, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* delete course success */
  on(UserActions.UserCourseDeleteSuccess, (state, { courseId }) => {

    return {
      ...state,
      user: {
        ...state.user,
        courses: state.user.courses.filter((c: Course) => c.id != courseId)
      },
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* create education */
  on(UserActions.UserEducationCreate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* create education success */
  on(UserActions.UserEducationCreateSuccess, (state, { education }) => {

    return {
      ...state,
      user: {
        ...state.user,
        educations: [
          ...state.user.educations,
          education]
      },
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* edit education */
  on(UserActions.UserEducationUpdate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* edit education success */
  on(UserActions.UserEducationUpdateSuccess, (state, { education }) => {

    return {
      ...state,
      user: {
        ...state.user,
        educations: state.user.educations.map((e: Education) => {
          if (e.id != education.id) return e;
          else return education;
        })
      },
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* delete education */
  on(UserActions.UserEducationDelete, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* delete education success */
  on(UserActions.UserEducationDeleteSuccess, (state, { educationId }) => {

    return {
      ...state,
      user: {
        ...state.user,
        educations: state.user.educations.filter((e: Education) => e.id != educationId)
      },
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* create language */
  on(UserActions.UserLanguageCreate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* create language success */
  on(UserActions.UserLanguageCreateSuccess, (state, { language }) => {

    return {
      ...state,
      user: {
        ...state.user,
        languages: [
          ...state.user.languages,
          language]
      },
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* edit language */
  on(UserActions.UserLanguageUpdate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* edit language success */
  on(UserActions.UserLanguageUpdateSuccess, (state, { language }) => {

    return {
      ...state,
      user: {
        ...state.user,
        languages: state.user.languages.map((l: Language) => {
          if (l.id != language.id) return l;
          else return language;
        })
      },
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* delete language */
  on(UserActions.UserLanguageDelete, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* delete language success */
  on(UserActions.UserLanguageDeleteSuccess, (state, { languageId }) => {

    return {
      ...state,
      user: {
        ...state.user,
        languages: state.user.languages.filter((l: Language) => l.id != languageId)
      },
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* update avatar */
  on(UserActions.UserAvatarUpdate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* update avatar success */
  on(UserActions.UserAvatarUpdateSuccess, (state, { avatar }) => {

    return {
      ...state,
      user: {
        ...state.user,
        avatarFile: avatar
      },
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* delete avatar */
  on(UserActions.UserAvatarDelete, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* delete avatar success */
  on(UserActions.UserAvatarDeleteSuccess, (state) => {

    return {
      ...state,
      user: {
        ...state.user,
        avatarFile: false
      },
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* get dni */
  on(UserActions.UserDniGet, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* get dni success */
  on(UserActions.UserDniGetSuccess, (state, { dni }) => {
    return {
      ...state,
      user: {
        ...state.user,
        documents: state.user.documents.map((document: UserDocument) => {
          if (document.name != USER_DOCUMENTS.dni) return document;
          else {
            return {
              ...document,
              file: dni
            }
          }
        })
      },
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* update dni */
  on(UserActions.UserDniUpdate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* update dni success */
  on(UserActions.UserDniUpdateSuccess, (state, { dni }) => {
    console.log(dni)
    return {
      ...state,
      user: {
        ...state.user,
        documents: state.user.documents.map((document: UserDocument) => {
          if (document.name != USER_DOCUMENTS.dni) return document;
          else {
            if (typeof document.file != 'boolean') window.URL.revokeObjectURL(document.file)
            return {
              ...document,
              file: dni
            }
          }
        })
      },
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* get offenses */
  on(UserActions.UserOffensesGet, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* get offenses success */
  on(UserActions.UserOffensesGetSuccess, (state, { offenses }) => {
    return {
      ...state,
      user: {
        ...state.user,
        documents: state.user.documents.map((document: UserDocument) => {
          if (document.name != USER_DOCUMENTS.sexOffenseCertificate) return document;
          else {
            return {
              ...document,
              file: offenses
            }
          }
        })
      },
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* update offenses */
  on(UserActions.UserOffensesUpdate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* update offenses success */
  on(UserActions.UserOffensesUpdateSuccess, (state, { offenses }) => {
    return {
      ...state,
      user: {
        ...state.user,
        documents: state.user.documents.map((document: UserDocument) => {
          if (document.name != USER_DOCUMENTS.sexOffenseCertificate) return document;
          else {
            if (typeof document.file != 'boolean') window.URL.revokeObjectURL(document.file)
            return {
              ...document,
              file: offenses
            }
          }
        })
      },
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* change password */
  on(UserActions.UserChangePassword, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* change password success */
  on(UserActions.UserChangePasswordSuccess, state => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* error */
  on(UserActions.UserError, (state, { err }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: err
    }
  }),

);

export function userReducer(state: UserState | undefined, action: Action) {
  return _userReducer(state, action);
}
