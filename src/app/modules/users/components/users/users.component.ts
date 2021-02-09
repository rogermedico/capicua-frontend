import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsersState } from '@modules/users/store/users.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { Observable, Subscription } from 'rxjs';
import * as UsersSelectors from '@modules/users/store/users.selector';
import * as UsersActions from '@modules/users/store/users.action';
import { MatSort } from '@angular/material/sort';
import { User } from '@models/user.model';
import { take, tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  public usersDisplayedColumns: string[] = ['name', 'surname', 'actions'];
  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  public usersStateSubscriptor: Subscription;
  public dataSource: MatTableDataSource<User>;

  constructor(private store$: Store<AppState>) { }

  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  };

  ngOnInit(): void {
    this.store$.dispatch(UsersActions.UsersGetAll());
    this.usersStateSubscriptor = this.usersState$.pipe(
      tap(us => {
        this.dataSource = new MatTableDataSource(us.users);
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

}
