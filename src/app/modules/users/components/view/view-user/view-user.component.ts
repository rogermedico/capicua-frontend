import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { Observable } from 'rxjs';
import * as UsersSelectors from '@modules/users/store/users.selector'
import { UsersState } from '@modules/users/store/users.state';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);

  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {
  }

}
