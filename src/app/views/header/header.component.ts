import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppState } from '@store/root.state';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserSelectors from '@store/user/user.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public title: string = 'UOC activities organizer';

  // public user$: Observable<User> = this.store$.select(UserSelectors.selectUser);

  // @Output() public sidenavToggle = new EventEmitter();

  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {

  }

  // public onToggleSidenav() {
  //   this.sidenavToggle.emit();
  // }

}
