import * as fromRouter from '@ngrx/router-store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppStore } from '@store/root.state';
import { RouterStateUrl } from './router.state';

export const selectRouterState = createFeatureSelector<AppStore, fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');

export const selectParams = createSelector(selectRouterState, routerReducer => routerReducer.state.params);