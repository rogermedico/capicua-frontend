import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { combineLatest, Observable, Subscription } from 'rxjs';
import * as UsersSelectors from '@modules/users/store/users.selector';
import * as RouterSelectors from '@store/router/router.selector';
import { Course } from '@models/course.model';
import { UsersState } from '@modules/users/store/users.state';
import { Params } from '@angular/router';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.scss']
})
export class ViewCoursesComponent implements OnInit, OnDestroy {

  public coursesDisplayedColumns: string[] = ['name', 'number', 'expeditionDate', 'validUntil'];
  public courses: Course[];
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public routeParams$: Observable<Params> = this.store$.select(RouterSelectors.selectParams);
  public routeParamsUsersStateSubscription: Subscription;

  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {

    this.routeParamsUsersStateSubscription = combineLatest([this.routeParams$, this.usersState$]).pipe(
      take(1),
      tap(([routeParams, usersState]) => {
        this.courses = usersState.users.find(user => user.id == routeParams.params.id).courses;
      })
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.routeParamsUsersStateSubscription.unsubscribe();
  }

}
