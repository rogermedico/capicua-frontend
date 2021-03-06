import { Component, OnInit } from '@angular/core';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector';
import { User } from '@models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { filter, take, tap } from 'rxjs/operators';
import { EducationDialogComponent } from '../dialogs/education-dialog/education-dialog.component';
import { Education } from '@models/education.model';
import * as UserActions from '@modules/user/store/user.action';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  public user: User;
  public educationsDisplayedColumns: string[] = ['name', 'finishDate', 'actions'];
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userStateSubscription: Subscription;
  public editable: boolean = true;

  constructor(
    private store$: Store<AppState>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userStateSubscription = this.userState$.pipe(
      filter(userState => {
        return userState != null;
      }),
      tap(userState => {
        this.user = userState.user;
      })
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.userStateSubscription.unsubscribe();
  }

  createEducation() {
    const dialogRef = this.dialog.open(EducationDialogComponent, {
      data: null
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result) => {
        if (result) {
          const education: Education = {
            name: result.name,
            finishDate: result.finishDate,
            finished: result.finished ? true : false
          };
          this.store$.dispatch(UserActions.UserEducationCreate({ education: education }));
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
      }
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
          this.store$.dispatch(UserActions.UserEducationUpdate({ education: editedEducation }));
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
          this.store$.dispatch(UserActions.UserEducationDelete({ educationId: education.id }));
        }
      })
    ).subscribe();
  }

}

