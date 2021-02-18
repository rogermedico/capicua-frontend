import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { User } from '@models/user.model';
import { UsersState } from '@modules/users/store/users.state';
import { Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as UserSelectors from '@modules/user/store/user.selector';
import * as UsersSelectors from '@modules/users/store/users.selector';
import * as RouterSelectors from '@store/router/router.selector';
import * as UsersActions from '@modules/users/store/users.action';
import { ParserService } from '@services/parser.service';
import { filter, take, tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { Education } from '@models/education.model';
import { EducationDialogComponent } from '../../dialogs/education-dialog/education-dialog.component';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.scss']
})
export class EditEducationComponent implements OnInit, OnDestroy {

  public userEdited: User;
  public educationsDisplayedColumns: string[] = ['name', 'finishDate', 'actions'];
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public routeParams$: Observable<Params> = this.store$.select(RouterSelectors.selectParams);
  public routeParamsUsersStateSubscription: Subscription;
  public editable: boolean;
  constructor(private store$: Store<AppState>, private dialog: MatDialog, private parser: ParserService) { }

  ngOnInit(): void {
    this.routeParamsUsersStateSubscription = combineLatest([this.routeParams$, this.usersState$, this.userState$]).pipe(
      filter(([routeParams, usersState, userState]) => {
        return routeParams.params != null && usersState.users != null && userState != null;
      }),
      tap(([routeParams, usersState, userState]) => {
        this.userEdited = usersState.users.find(user => user.id == routeParams.params.id);
        if (this.userEdited) {
          this.editable = this.userEdited.userType.rank > userState.user.userType.rank || this.userEdited.userType.id == userState.user.id;
        }
      })
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.routeParamsUsersStateSubscription.unsubscribe();
    // this.courseTypesSubscription.unsubscribe();
  }

  createEducation() {
    const dialogRef = this.dialog.open(EducationDialogComponent, {
      data: null,
      // width: '400px'
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result) => {
        if (result) {
          const education: Education = {
            name: result.name,
            finishDate: result.finishDate,//')]: result.expeditionDate ? `${result.expeditionDate.getFullYear()}-${result.expeditionDate.getMonth() + 1}-${result.expeditionDate.getDate()}` : null,
            finished: result.finished ? true : false
          };
          console.log(education)
          this.store$.dispatch(UsersActions.UsersEducationCreate({ userId: this.userEdited.id, education: education }));
        }
      })
    ).subscribe();
  }

  editEducation(education: Education) {
    const dialogRef = this.dialog.open(EducationDialogComponent, {
      data: {
        name: education.name,
        finishDate: education.finishDate,
        finished: education.finished,
      },
      // width: '400px'
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result) => {
        if (result) {
          const editedEducation: Education = {
            id: education.id,
            name: result.name,
            finishDate: result.finishDate,
            finished: result.finished ? true : false
          };
          console.log(education)
          this.store$.dispatch(UsersActions.UsersEducationUpdate({ userId: this.userEdited.id, education: editedEducation }));
        }
      })
    ).subscribe();
  }

  deleteEducation(education: Education) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        question: 'Are you sure you want to delete the following education:',
        element: education.name
      },
      width: '400px'
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result: boolean) => {
        if (result) {
          this.store$.dispatch(UsersActions.UsersEducationDelete({ userId: this.userEdited.id, educationId: education.id }));
        }
      })
    ).subscribe();
  }

}
