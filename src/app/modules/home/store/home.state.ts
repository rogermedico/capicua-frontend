import { HomePost } from '@models/home-post.model';

export interface HomeState {
  posts: HomePost[];
  loading: boolean;
  loaded: boolean;
  error: Error;
}