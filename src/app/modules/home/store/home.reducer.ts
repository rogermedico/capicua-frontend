import { HomeState } from './home.state';
import * as HomeActions from './home.action';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from '@models/user.model';
import { Course } from '@models/course.model';
import { Education } from '@models/education.model';
import { Language } from '@models/language.model';
import { HomeDocument, PersonalDocument, UserDocument } from '@models/document.model';
import { USER_DOCUMENTS } from '@constants/user-documents.constant';
import { HomePost } from '@models/home-post.model';

/* the auth state starts with no one logged in */
const defaultHomeState: HomeState = {
  posts: null,
  loading: false,
  loaded: true,
  error: null
};

const _homeReducer = createReducer(defaultHomeState,

  /* get data */
  on(HomeActions.HomeGetAll, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* get data success */
  on(HomeActions.HomeGetAllSuccess, (state, { homePosts }) => {
    return {
      ...state,
      posts: state.posts === null ? homePosts : homePosts.map(newPost => {
        const oldPost = state.posts.find(oldPost => oldPost.id === newPost.id);
        return {
          ...newPost,
          documents: newPost.documents.map(doc => {
            const oldDocument = oldPost.documents.find(oldDoc => oldDoc.id === doc.id);
            if (oldDocument.file) {
              return {
                ...doc,
                file: oldDocument.file
              }
            }
            else return doc;
          })
        }

      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* reset data */
  on(HomeActions.HomeReset, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* reset data success */
  on(HomeActions.HomeResetSuccess, state => {
    return {
      ...state,
      posts: null,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* create home post */
  on(HomeActions.HomeCreatePost, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* create user success */
  on(HomeActions.HomeCreatePostSuccess, (state, { homePost }) => {
    console.log('reducer new home post', homePost)
    return {
      ...state,
      posts: [...state.posts, homePost],
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* update home post */
  on(HomeActions.HomeUpdatePost, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* update home post success */
  on(HomeActions.HomeUpdatePostSuccess, (state, { updatedHomePost }) => {

    return {
      ...state,
      posts: state.posts.map((post: HomePost) => {
        if (post.id != updatedHomePost.id) return post;
        else return {
          ...updatedHomePost,
          documents: post.documents
        }
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  // /* get avatar */
  // on(HomeActions.HomeAvatarGet, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // }),

  // /* get avatar success */
  // on(HomeActions.HomeAvatarGetSuccess, (state, { userId, avatar }) => {

  //   return {
  //     ...state,
  //     users: state.users.map((u: User) => {
  //       if (u.id != userId) {
  //         return u;
  //       }
  //       else {
  //         return {
  //           ...u,
  //           avatarFile: avatar
  //         }
  //       }
  //     }),
  //     loading: false,
  //     loaded: true,
  //     error: null
  //   }
  // }),

  // /* get dni */
  // on(HomeActions.HomeDniGet, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // }),

  // /* get dni success */
  // on(HomeActions.HomeDniGetSuccess, (state, { userId, dni }) => {
  //   return {
  //     ...state,
  //     users: state.users.map((u: User) => {
  //       if (u.id != userId) {
  //         return u;
  //       }
  //       else {
  //         return {
  //           ...u,
  //           userDocuments: u.userDocuments.map((userDocument: UserDocument) => {
  //             if (userDocument.name != USER_DOCUMENTS.dni) return userDocument;
  //             else {
  //               return {
  //                 ...userDocument,
  //                 file: dni
  //               }
  //             }
  //           })
  //         }
  //       }
  //     }),
  //     loading: false,
  //     loaded: true,
  //     error: null
  //   }
  // }),

  // /* get offenses */
  // on(HomeActions.HomeOffensesGet, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // }),

  // /* get offenses success */
  // on(HomeActions.HomeOffensesGetSuccess, (state, { userId, offenses }) => {
  //   return {
  //     ...state,
  //     users: state.users.map((u: User) => {
  //       if (u.id != userId) {
  //         return u;
  //       }
  //       else {
  //         return {
  //           ...u,
  //           userDocuments: u.userDocuments.map((userDocument: UserDocument) => {
  //             if (userDocument.name != USER_DOCUMENTS.sexOffenseCertificate) return userDocument;
  //             else {
  //               return {
  //                 ...userDocument,
  //                 file: offenses
  //               }
  //             }
  //           })
  //         }
  //       }
  //     }),
  //     loading: false,
  //     loaded: true,
  //     error: null
  //   }
  // }),

  // /* activate */
  // on(HomeActions.HomeActivate, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // }),

  // /* activate success */
  // on(HomeActions.HomeActivateSuccess, (state, { userId }) => {

  //   return {
  //     ...state,
  //     users: state.users.map((u: User) => {
  //       if (u.id != userId) {
  //         return u;
  //       }
  //       else {
  //         return {
  //           ...u,
  //           deactivated: false
  //         }
  //       }
  //     }),
  //     loading: false,
  //     loaded: true,
  //     error: null
  //   }
  // }),

  // /* deactivate */
  // on(HomeActions.HomeDeactivate, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // }),

  // /* deactivate success */
  // on(HomeActions.HomeDeactivateSuccess, (state, { userId }) => {

  //   return {
  //     ...state,
  //     users: state.users.map((u: User) => {
  //       if (u.id != userId) {
  //         return u;
  //       }
  //       else {
  //         return {
  //           ...u,
  //           deactivated: true
  //         }
  //       }
  //     }),
  //     loading: false,
  //     loaded: true,
  //     error: null
  //   }
  // }),

  /* delete home post */
  on(HomeActions.HomeDeletePost, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* delete home post success */
  on(HomeActions.HomeDeletePostSuccess, (state, { homePostId }) => {

    return {
      ...state,
      posts: state.posts.filter((post: HomePost) => post.id != homePostId),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* move home post */
  on(HomeActions.HomeMovePost, state => {
    return {
      ...state,
      // loading: true,
      // loaded: false,
      error: null
    }
  }),

  /* move home post success */
  on(HomeActions.HomeMovePostSuccess, (state, { homePostOriginId, homePostDestinationId }) => {

    const newPosts: HomePost[] = [...state.posts];
    const originPostIndex = newPosts.findIndex(post => homePostOriginId == post.id);
    const destinationPostIndex = newPosts.findIndex(post => homePostDestinationId == post.id);
    const tmp: HomePost = newPosts[originPostIndex];
    newPosts[originPostIndex] = newPosts[destinationPostIndex];
    newPosts[destinationPostIndex] = tmp;

    return {
      ...state,
      posts: newPosts,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* add home post document */
  on(HomeActions.HomeAddPostDocument, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* add home post document success */
  on(HomeActions.HomeAddPostDocumentSuccess, (state, { homeDocument }) => {
    return {
      ...state,
      posts: state.posts.map((post: HomePost) => {
        if (post.id != homeDocument.homePostId) return post;
        else return {
          ...post,
          documents: [
            ...post.documents,
            homeDocument
          ]
        }
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  // /* get all personal documents info */
  // on(HomeActions.HomeGetAllPersonalDocumentsInfo, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // }),

  // /* get personal documents info success */
  // on(HomeActions.HomeGetAllPersonalDocumentsInfoSuccess, (state, { personalDocuments }) => {
  //   return {
  //     ...state,
  //     users: state.users.map((user: User) => {
  //       const userDocuments = personalDocuments.filter((pd: PersonalDocument) => pd.userId == user.id);
  //       return {
  //         ...user,
  //         personalDocuments: userDocuments.map(ud => {
  //           const oldDocument = user.personalDocuments.find(oldPd => oldPd.id == ud.id)
  //           if (oldDocument) return oldDocument;
  //           else return ud;
  //         })
  //       }
  //     }),
  //     loading: false,
  //     loaded: true,
  //     error: null
  //   }
  // }),

  /* get home post document */
  on(HomeActions.HomeGetPostDocument, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* get home post document success */
  on(HomeActions.HomeGetPostDocumentSuccess, (state, { homePostDocument }) => {
    console.log('home reducer get post document success', homePostDocument);
    return {
      ...state,
      posts: state.posts.map((post: HomePost) => {
        if (post.id != homePostDocument.homePostId) return post;
        else return {
          ...post,
          documents: post.documents.map((hd: HomeDocument) => {
            if (hd.id != homePostDocument.id) return hd;
            else return homePostDocument;
          })
        }
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  // /* add personal document */
  // on(HomeActions.HomeAddPersonalDocument, state => {
  //   return {
  //     ...state,
  //     loading: true,
  //     loaded: false,
  //     error: null
  //   }
  // }),

  // /* add personal document success */
  // on(HomeActions.HomeAddPersonalDocumentSuccess, (state, { personalDocument }) => {
  //   return {
  //     ...state,
  //     users: state.users.map((user: User) => {
  //       if (user.id != personalDocument.userId) return user;
  //       else return {
  //         ...user,
  //         personalDocuments: [
  //           ...user.personalDocuments,
  //           personalDocument
  //         ]
  //       }
  //     }),
  //     loading: false,
  //     loaded: true,
  //     error: null
  //   }
  // }),

  /* delete home post document */
  on(HomeActions.HomeDeletePostDocument, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* delete personal document success */
  on(HomeActions.HomeDeletePostDocumentSuccess, (state, { homePostId, homePostDocumentId }) => {
    return {
      ...state,
      posts: state.posts.map((post: HomePost) => {
        if (post.id != homePostId) return post;
        else return {
          ...post,
          documents: post.documents.filter((homePostDocument: HomeDocument) => homePostDocument.id != homePostDocumentId)
        }
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* error */
  on(HomeActions.HomeError, (state, { err }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: err
    }
  }),


);

export function homeReducer(state: HomeState | undefined, action: Action) {
  return _homeReducer(state, action);
}
