import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsersState } from '@modules/users/store/users.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { Observable, Subscription } from 'rxjs';
import * as UsersSelectors from '@modules/users/store/users.selector';
import * as UsersActions from '@modules/users/store/users.action';
import * as UserSelectors from '@modules/user/store/user.selector';
import { MatSort } from '@angular/material/sort';
import { User } from '@models/user.model';
import { skipWhile, take, tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserState } from '@modules/user/store/user.state';
import { ParserService } from '@services/parser.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  public usersDisplayedColumns: string[] = ['name', 'surname', 'rank', 'actions'];
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public usersStateSubscriptor: Subscription;
  public dataSource: MatTableDataSource<User> = new MatTableDataSource();

  constructor(private store$: Store<AppState>, private dialog: MatDialog, private parser: ParserService) { }

  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  };

  ngOnInit(): void {
    this.store$.dispatch(UsersActions.UsersGetAll());
    this.usersStateSubscriptor = this.usersState$.pipe(
      skipWhile(us => us.users == null),
      tap(us => {
        this.dataSource = new MatTableDataSource(us.users.filter(user => !user.deactivated));
        /* allow filter ignoring accents and diacritics */
        this.dataSource.filterPredicate = (data: User, filter: string): boolean => {
          const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
            return (currentTerm + (data as { [key: string]: any })[key] + '◬');
          }, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          const transformedFilter = filter.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          return dataStr.indexOf(transformedFilter) != -1;
        }

        // to sort no first properties
        // this.dataSource.sortingDataAccessor = (item, property) => {
        //   switch (property) {
        //     case 'rank': return item.userType.name;
        //     default: return item[property]
        //   }
        // };
        // this.dataSource.sort = this.sort;
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.usersStateSubscriptor.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        question: 'Are you sure you want to deactivate the following user:',
        element: `${user.name} ${user.surname}`
      },
      width: '400px'
    });

    // dialogRef.afterClosed().subscribe((result: boolean) => {
    //   if (result) {
    //     const updatedProperties = {
    //       deactivated: result
    //     };

    //     this.store$.dispatch(UsersActions.UsersUpdate({ id: user.id, updatedProperties: updatedProperties }));
    //   }
    // });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result: boolean) => {
        if (result) {
          const modifiedUser = {
            [this.parser.translateToBackend('deactivated')]: result,
          };

          this.store$.dispatch(UsersActions.UsersProfileUpdate({ id: user.id, updatedProperties: modifiedUser }));
        }
      })
    ).subscribe();




  }

}
