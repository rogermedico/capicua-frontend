import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector';
import { filter, take, tap } from 'rxjs/operators';
import { User } from '@models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { LanguageDialogComponent } from '../dialogs/language-dialog/language-dialog.component';
import { Language } from '@models/language.model';
import * as UserActions from '@modules/user/store/user.action';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit, OnDestroy {

  public user: User;
  public languagesDisplayedColumns: string[] = ['name', 'level', 'finishDate', 'actions'];
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

  createLanguage() {
    const dialogRef = this.dialog.open(LanguageDialogComponent, {
      data: {
        languagesAlreadyAdded: this.user.languages.map(l => l.name)
      }
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
          this.store$.dispatch(UserActions.UserLanguageCreate({ language: language }));
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
          this.store$.dispatch(UserActions.UserLanguageUpdate({ language: editedLanguage }));
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
          this.store$.dispatch(UserActions.UserLanguageDelete({ languageId: language.id }));
        }
      })
    ).subscribe();
  }
}
