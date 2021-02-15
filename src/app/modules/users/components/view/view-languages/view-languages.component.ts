import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { combineLatest, Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector';
import { take, tap } from 'rxjs/operators';
import { Language } from '@models/language.model';
import { Params } from '@angular/router';
import { UsersState } from '@modules/users/store/users.state';
import * as UsersSelectors from '@modules/users/store/users.selector';
import * as RouterSelectors from '@store/router/router.selector';

@Component({
  selector: 'app-view-languages',
  templateUrl: './view-languages.component.html',
  styleUrls: ['./view-languages.component.scss']
})
export class ViewLanguagesComponent implements OnInit, OnDestroy {

  public languagesDisplayedColumns: string[] = ['name', 'level', 'finishDate'];
  public languages: Language[];
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public routeParams$: Observable<Params> = this.store$.select(RouterSelectors.selectParams);
  public routeParamsUsersStateSubscription: Subscription;

  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {

    this.routeParamsUsersStateSubscription = combineLatest([this.routeParams$, this.usersState$]).pipe(
      take(1),
      tap(([routeParams, usersState]) => {
        this.languages = usersState.users.find(user => user.id == routeParams.params.id).languages;
      })
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.routeParamsUsersStateSubscription.unsubscribe();
  }

}
