import { HomeState } from './home.state';
import * as HomeActions from './home.action';
import { Action, createReducer, on } from '@ngrx/store';
import { HomeDocument } from '@models/document.model';
import { HomePost } from '@models/home-post.model';

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
