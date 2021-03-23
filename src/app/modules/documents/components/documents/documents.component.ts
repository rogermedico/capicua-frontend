import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsersState } from '@modules/users/store/users.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { Observable, Subscription } from 'rxjs';
import * as UsersSelectors from '@modules/users/store/users.selector';
import * as UsersActions from '@modules/users/store/users.action';
import * as UserSelectors from '@modules/user/store/user.selector';
import { MatSort } from '@angular/material/sort';
import { NewUser, User } from '@models/user.model';
import { filter, map, skipWhile, switchMap, take, tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserState } from '@modules/user/store/user.state';
import { ParserService } from '@services/parser.service';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit, OnDestroy {

  public activeUsersDisplayedColumns: string[] = ['name', 'surname', 'actions'];
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public usersStateSubscription: Subscription;
  public addDocumentNotificationSubscription: Subscription;
  public activeUsers: MatTableDataSource<User> = new MatTableDataSource();
  public inactiveUsers: MatTableDataSource<User> = new MatTableDataSource();

  constructor(
    private store$: Store<AppState>,
    private dialog: MatDialog,
    private parserService: ParserService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.store$.dispatch(UsersActions.UsersGetAll());
    this.usersStateSubscription = this.usersState$.pipe(
      // skipWhile(us => us.users == null),
      filter(us => us.users != null),
      tap(us => {
        this.activeUsers = new MatTableDataSource(us.users.filter(user => !user.deactivated));
        /* allow filter ignoring accents and diacritics */
        this.activeUsers.filterPredicate = (data: User, filter: string): boolean => {
          const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
            return (currentTerm + (data as { [key: string]: any })[key] + '◬');
          }, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          const transformedFilter = filter.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          return dataStr.indexOf(transformedFilter) != -1;
        };
      })
    ).subscribe();

    this.usersState$.pipe(
      filter(us => us.users != null),
      take(1),
      map(() => this.store$.dispatch(UsersActions.UsersGetAllPersonalDocumentsInfo()))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.usersStateSubscription.unsubscribe();
    if (this.addDocumentNotificationSubscription) this.addDocumentNotificationSubscription.unsubscribe();
  }

  activeUsersApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.activeUsers.filter = filterValue.trim().toLowerCase();
  }

  addDocument(user: User, fileInputEvent: any) {
    const userDocumentFile = fileInputEvent.target.files[0];
    this.store$.dispatch(UsersActions.UsersAddPersonalDocument({ userId: user.id, document: userDocumentFile }));
    this.addDocumentNotificationSubscription = this.userState$.pipe(
      skipWhile(userState => userState.loading),
      take(1),
      map(() => {
        this.notificationService.showMessage('Document successfully updated', 'OK');
      })
    ).subscribe()
  }

}

