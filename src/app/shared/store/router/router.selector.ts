import * as fromRouter from '@ngrx/router-store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { RouterStateUrl } from './router.state';

export const selectRouterState = createFeatureSelector<AppState, fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');

export const selectRouterReducer = createSelector(selectRouterState, routerReducer => routerReducer);
export const selectParams = createSelector(selectRouterState, routerReducer => routerReducer.state);