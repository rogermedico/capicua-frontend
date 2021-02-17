import { Component, OnInit } from '@angular/core';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { combineLatest, Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector';
import * as UsersSelectors from '@modules/users/store/users.selector';
import * as RouterSelectors from '@store/router/router.selector';
import * as UsersActions from '@modules/users/store/users.action';
import { UsersState } from '@modules/users/store/users.state';
import { Params } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from '@models/user.model';
import { Course } from '@models/course.model';

@Component({
  selector: 'app-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.scss']
})
export class EditCoursesComponent implements OnInit {

  public courses: Course[];
  public coursesDisplayedColumns: string[] = ['name', 'number', 'expeditionDate', 'validUntil', 'actions'];
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public routeParams$: Observable<Params> = this.store$.select(RouterSelectors.selectParams);
  public routeParamsUsersStateSubscription: Subscription;
  public editable: boolean;
  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {

    this.routeParamsUsersStateSubscription = combineLatest([this.routeParams$, this.usersState$, this.userState$]).pipe(
      tap(([routeParams, usersState, userState]) => {
        const userEdited = usersState.users.find(user => user.id == routeParams.params.id);
        if (userEdited) {
          this.courses = userEdited.courses;
          this.editable = userEdited.userType.rank > userState.user.userType.rank || userEdited.userType.id == userState.user.id;
        }
      })
    ).subscribe();



  }

}
