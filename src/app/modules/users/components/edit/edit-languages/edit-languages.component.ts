import { Component, OnInit } from '@angular/core';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { combineLatest, Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector';
import * as UsersSelectors from '@modules/users/store/users.selector';
import * as RouterSelectors from '@store/router/router.selector';
import * as UsersActions from '@modules/users/store/users.action';
import { User } from '@models/user.model';
import { UsersState } from '@modules/users/store/users.state';
import { Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ParserService } from '@services/parser.service';
import { filter, take, tap } from 'rxjs/operators';
import { Language } from '@models/language.model';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { LanguageDialogComponent } from '../../dialogs/language-dialog/language-dialog.component';

@Component({
  selector: 'app-edit-languages',
  templateUrl: './edit-languages.component.html',
  styleUrls: ['./edit-languages.component.scss']
})
export class EditLanguagesComponent implements OnInit {

  public userEdited: User;
  public languagesDisplayedColumns: string[] = ['name', 'level', 'finishDate', 'actions'];
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public routeParams$: Observable<Params> = this.store$.select(RouterSelectors.selectParams);
  public combinedStatesSubscription: Subscription;
  public editable: boolean;
  constructor(private store$: Store<AppState>, private dialog: MatDialog, private parser: ParserService) { }

  ngOnInit(): void {
    this.combinedStatesSubscription = combineLatest([this.routeParams$, this.usersState$, this.userState$]).pipe(
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
    this.combinedStatesSubscription.unsubscribe();
    // this.courseTypesSubscription.unsubscribe();
  }

  createLanguage() {
    const dialogRef = this.dialog.open(LanguageDialogComponent, {
      data: {
        languagesAlreadyAdded: this.userEdited.languages.map(l => l.name)
      },
      // width: '400px'
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result) => {
        if (result) {
          const language: Language = {
            name: result.name,
            level: result.level,
            finishDate: result.finishDate
          };
          console.log(language)
          this.store$.dispatch(UsersActions.UsersLanguageCreate({ userId: this.userEdited.id, language: language }));
        }
      })
    ).subscribe();
  }

  editLanguage(language: Language) {
    const dialogRef = this.dialog.open(LanguageDialogComponent, {
      data: {
        name: language.name,
        level: language.level,
        finishDate: language.finishDate,
        languagesAlreadyAdded: null
      }
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result) => {
        if (result) {
          const editedLanguage: Language = {
            id: language.id,
            name: result.name,
            level: result.level,
            finishDate: result.finishDate
          };
          console.log(language)
          this.store$.dispatch(UsersActions.UsersLanguageUpdate({ userId: this.userEdited.id, language: editedLanguage }));
        }
      })
    ).subscribe();
  }

  deleteLanguage(language: Language) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        question: 'Are you sure you want to delete the following language:',
        element: language.name
      },
      width: '400px'
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result: boolean) => {
        if (result) {
          this.store$.dispatch(UsersActions.UsersLanguageDelete({ userId: this.userEdited.id, languageId: language.id }));
        }
      })
    ).subscribe();
  }
}