import { Component, OnInit } from '@angular/core';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { Observable } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  public educationsDisplayedColumns: string[] = ['name', 'finishDate'];
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);

  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {
  }

}
