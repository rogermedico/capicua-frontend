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
import { filter, map, skipWhile, take, tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserState } from '@modules/user/store/user.state';
import { ParserService } from '@services/parser.service';
import { NewUserDialogComponent } from '../dialogs/new-user-dialog/new-user-dialog.component';
import { NotificationService } from '@services/notification.service';
import { EditUserDialogComponent } from '../dialogs/edit-user-dialog/edit-user-dialog.component';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  public activeUsersDisplayedColumns: string[] = ['name', 'surname', 'rank', 'actions'];
  public inactiveUsersDisplayedColumns: string[] = ['name', 'surname', 'actions'];
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public usersStateSubscription: Subscription;
  public notificationSubscription: Subscription;
  public activeUsers: MatTableDataSource<User> = new MatTableDataSource();
  public inactiveUsers: MatTableDataSource<User> = new MatTableDataSource();
  public activeTab: number = 0;

  constructor(
    private store$: Store<AppState>,
    private dialog: MatDialog,
    private parserService: ParserService,
    private notificationService: NotificationService) { }

  // @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
  //   this.activeUsers.sort = sort;
  // };

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

        this.inactiveUsers = new MatTableDataSource(us.users.filter(user => user.deactivated));
        /* allow filter ignoring accents and diacritics */
        this.inactiveUsers.filterPredicate = (data: User, filter: string): boolean => {
          const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
            return (currentTerm + (data as { [key: string]: any })[key] + '◬');
          }, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          const transformedFilter = filter.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          return dataStr.indexOf(transformedFilter) != -1;
        }

        // to sort no first properties
        // this.activeUsers.sortingDataAccessor = (item, property) => {
        //   switch (property) {
        //     case 'rank': return item.userType.name;
        //     default: return item[property]
        //   }
        // };
        // this.activeUsers.sort = this.sort;
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.usersStateSubscription.unsubscribe();
    if (this.notificationSubscription) this.notificationSubscription.unsubscribe();
  }

  activeUsersApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.activeUsers.filter = filterValue.trim().toLowerCase();
  }

  inactiveUsersApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.inactiveUsers.filter = filterValue.trim().toLowerCase();
  }

  newUser(): void {
    const dialogRef = this.dialog.open(NewUserDialogComponent);

    dialogRef.afterClosed().pipe(
      take(1),
      tap((newUser: NewUser) => {
        if (newUser) {
          this.store$.dispatch(UsersActions.UsersCreate({ newUser: newUser }));
          this.notificationSubscription = this.usersState$.pipe(
            skipWhile(usersState => usersState.loading),
            take(1),
            map(() => {
              this.notificationService.showMessage('New user created successfully', 'OK');
            })
          ).subscribe()
        }
      })
    ).subscribe();
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: {
        userTypeId: user.userType.id,
        actualPosition: user.actualPosition
      },
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap(editedProperties => {
        if (editedProperties) {
          const editedPropertiesSend = {};
          for (const [k, v] of Object.entries(editedProperties)) {
            editedPropertiesSend[this.parserService.translateToBackend(k)] = v;
          };
          this.store$.dispatch(UsersActions.UsersEdit({ userId: user.id, editedProperties: editedPropertiesSend }));
          this.notificationSubscription = this.usersState$.pipe(
            skipWhile(usersState => usersState.loading),
            take(1),
            map(() => {
              this.notificationService.showMessage('User edited successfully', 'OK');
            })
          ).subscribe()
        }
      })
    ).subscribe();
  }

  activateUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        question: 'Are you sure you want to reactivate the following user:',
        element: `${user.name} ${user.surname}`
      },
      // width: '400px'
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result: boolean) => {
        if (result) {
          this.store$.dispatch(UsersActions.UsersActivate({ userId: user.id }));
          this.notificationSubscription = this.usersState$.pipe(
            skipWhile(usersState => usersState.loading),
            take(1),
            map(() => {
              this.notificationService.showMessage('User successfully reactivated', 'OK');
            })
          ).subscribe()
        }
      })
    ).subscribe();

  }

  deactivateUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        question: 'Are you sure you want to deactivate the following user:',
        element: `${user.name} ${user.surname}`
      },
      // width: '400px'
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result: boolean) => {
        if (result) {
          this.store$.dispatch(UsersActions.UsersDeactivate({ userId: user.id }));
          this.notificationSubscription = this.usersState$.pipe(
            skipWhile(usersState => usersState.loading),
            take(1),
            map(() => {
              this.notificationService.showMessage('User successfully deactivated', 'OK');
            })
          ).subscribe()
        }
      })
    ).subscribe();

  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        question: 'Are you sure you want to permanently delete the following user:',
        element: `${user.name} ${user.surname}`
      },
      // width: '400px'
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result: boolean) => {
        if (result) {
          this.store$.dispatch(UsersActions.UsersDelete({ userId: user.id }));
          this.notificationSubscription = this.usersState$.pipe(
            skipWhile(usersState => usersState.loading),
            take(1),
            map(() => {
              this.notificationService.showMessage('User successfully deleted', 'OK');
            })
          ).subscribe()
        }
      })
    ).subscribe();

  }

}
