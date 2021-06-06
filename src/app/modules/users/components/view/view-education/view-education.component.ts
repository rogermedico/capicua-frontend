import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { Education } from '@models/education.model';
import { UsersState } from '@modules/users/store/users.state';
import { Params } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import * as UsersSelectors from '@modules/users/store/users.selector';
import * as RouterSelectors from '@store/router/router.selector';

@Component({
  selector: 'app-view-education',
  templateUrl: './view-education.component.html',
  styleUrls: ['./view-education.component.scss']
})
export class ViewEducationComponent implements OnInit, OnDestroy {

  public educationsDisplayedColumns: string[] = ['name', 'finishDate'];
  public educations: Education[];
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public routeParams$: Observable<Params> = this.store$.select(RouterSelectors.selectParams);
  public routeParamsUsersStateSubscription: Subscription;

  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {

    this.routeParamsUsersStateSubscription = combineLatest([this.routeParams$, this.usersState$]).pipe(
      take(1),
      tap(([routeParams, usersState]) => {
        this.educations = usersState.users.find(user => user.id == routeParams.params.id).educations;
      })
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.routeParamsUsersStateSubscription.unsubscribe();
  }

}
