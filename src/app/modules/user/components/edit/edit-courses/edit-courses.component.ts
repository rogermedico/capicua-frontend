import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { combineLatest, Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector';
import * as UsersSelectors from '@modules/users/store/users.selector';
import * as RouterSelectors from '@store/router/router.selector';
import * as AppConstantsSelectors from '@store/app-constants/app-constants.selector';
import * as UsersActions from '@modules/users/store/users.action';
import { UsersState } from '@modules/users/store/users.state';
import { Params } from '@angular/router';
import { filter, take, tap } from 'rxjs/operators';
import { User } from '@models/user.model';
import { Course, CourseType } from '@models/course.model';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ParserService } from '@services/parser.service';
import { CourseDialogComponent } from '../../dialogs/course-dialog/course-dialog.component';

@Component({
  selector: 'app-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.scss']
})
export class EditCoursesComponent implements OnInit, OnDestroy {

  public userEdited: User;
  public coursesDisplayedColumns: string[] = ['name', 'number', 'expeditionDate', 'validUntil', 'actions'];
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public routeParams$: Observable<Params> = this.store$.select(RouterSelectors.selectParams);
  public courseTypes$: Observable<CourseType[]> = this.store$.select(AppConstantsSelectors.selectCourseTypes);
  public courseTypesSubscription: Subscription;
  public routeParamsUsersStateSubscription: Subscription;
  public courseTypes: CourseType[];
  public editable: boolean;
  public allCoursesDone: boolean;
  constructor(private store$: Store<AppState>, private dialog: MatDialog, private parser: ParserService) { }

  ngOnInit(): void {

    this.routeParamsUsersStateSubscription = combineLatest([this.routeParams$, this.usersState$, this.userState$, this.courseTypes$]).pipe(
      filter(([routeParams, usersState, userState, courseTypes]) => {
        return routeParams.params != null && usersState.users != null && userState != null && courseTypes != null;
      }),
      tap(([routeParams, usersState, userState, courseTypes]) => {
        this.userEdited = usersState.users.find(user => user.id == routeParams.params.id);
        this.courseTypes = courseTypes;
        if (this.userEdited) {
          this.editable = this.userEdited.userType.rank > userState.user.userType.rank || this.userEdited.userType.id == userState.user.id;
          this.allCoursesDone = this.userEdited.courses.length == courseTypes.length;
        }
      })
    ).subscribe();

    // this.courseTypesSubscription = this.courseTypes$.pipe(
    //   take(1),
    //   tap(ct => this.courseTypes = ct)
    // ).subscribe();

  }

  ngOnDestroy(): void {
    this.routeParamsUsersStateSubscription.unsubscribe();
    // this.courseTypesSubscription.unsubscribe();
  }

  createCourse() {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      data: {
        coursesAlreadyAdded: this.userEdited.courses.map(c => c.id)
      },
      // width: '400px'
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result) => {
        if (result) {
          const course: Course = {
            id: result.courseId,
            name: this.courseTypes.find(ct => ct.id == result.courseId).name,
            number: result.number,
            expeditionDate: result.expeditionDate,//')]: result.expeditionDate ? `${result.expeditionDate.getFullYear()}-${result.expeditionDate.getMonth() + 1}-${result.expeditionDate.getDate()}` : null,
            validUntil: result.validUntil
          };
          this.store$.dispatch(UsersActions.UsersCourseCreate({ userId: this.userEdited.id, course: course }));
        }
      })
    ).subscribe();
  }

  editCourse(course: Course) {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      data: {
        courseId: course.id,
        number: course.number,
        expeditionDate: course.expeditionDate,
        validUntil: course.validUntil,
        coursesAlreadyAdded: null
      },
      // width: '400px'
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result) => {
        if (result) {
          const course: Course = {
            id: result.courseId,
            name: this.courseTypes.find(ct => ct.id == result.courseId).name,
            number: result.number,
            expeditionDate: result.expeditionDate,//')]: result.expeditionDate ? `${result.expeditionDate.getFullYear()}-${result.expeditionDate.getMonth() + 1}-${result.expeditionDate.getDate()}` : null,
            validUntil: result.validUntil
          };
          this.store$.dispatch(UsersActions.UsersCourseUpdate({ userId: this.userEdited.id, course: course }));
        }
      })
    ).subscribe();
  }

  deleteCourse(course: Course) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        question: 'Are you sure you want to delete the following course:',
        element: course.name
      },
      width: '400px'
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result: boolean) => {
        if (result) {
          this.store$.dispatch(UsersActions.UsersCourseDelete({ userId: this.userEdited.id, courseId: course.id }));
        }
      })
    ).subscribe();

  }


}
