import { Component, OnInit } from '@angular/core';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { combineLatest, Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector';
import { User } from '@models/user.model';
import { Course, CourseType } from '@models/course.model';
import * as AppConstantsSelectors from '@store/app-constants/app-constants.selector';
import { filter, take, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ParserService } from '@services/parser.service';
import { CourseDialogComponent } from '../dialogs/course-dialog/course-dialog.component';
import * as UserActions from '@modules/user/store/user.action';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  public user: User;
  public coursesDisplayedColumns: string[] = ['name', 'number', 'expeditionDate', 'validUntil', 'actions'];
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public courseTypes$: Observable<CourseType[]> = this.store$.select(AppConstantsSelectors.selectCourseTypes);
  public userCourseTypesSubscription: Subscription;
  public courseTypes: CourseType[];
  public editable: boolean = true;
  public allCoursesDone: boolean;

  constructor(
    private store$: Store<AppState>,
    private dialog: MatDialog,
    private parser: ParserService
  ) { }

  ngOnInit(): void {

    this.userCourseTypesSubscription = combineLatest([this.userState$, this.courseTypes$]).pipe(
      filter(([userState, courseTypes]) => {
        return userState != null && courseTypes != null;
      }),
      tap(([userState, courseTypes]) => {
        this.user = userState.user;
        this.courseTypes = courseTypes;
        if (this.user) {
          this.allCoursesDone = this.user.courses.length == courseTypes.length;
        }
      })
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.userCourseTypesSubscription.unsubscribe();
  }

  createCourse() {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      data: {
        coursesAlreadyAdded: this.user.courses.map(c => c.id)
      }
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result) => {
        if (result) {
          const course: Course = {
            id: result.courseId,
            name: this.courseTypes.find(ct => ct.id == result.courseId).name,
            number: result.number,
            expeditionDate: result.expeditionDate,
            validUntil: result.validUntil
          };
          this.store$.dispatch(UserActions.UserCourseCreate({ course: course }));
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
      }
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result) => {
        if (result) {
          const course: Course = {
            id: result.courseId,
            name: this.courseTypes.find(ct => ct.id == result.courseId).name,
            number: result.number,
            expeditionDate: result.expeditionDate,
            validUntil: result.validUntil
          };
          this.store$.dispatch(UserActions.UserCourseUpdate({ course: course }));
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
          this.store$.dispatch(UserActions.UserCourseDelete({ courseId: course.id }));
        }
      })
    ).subscribe();

  }

}
