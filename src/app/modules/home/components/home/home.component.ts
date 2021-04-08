import { Component, OnInit } from '@angular/core';
import { HomeState } from '@modules/home/store/home.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { Observable } from 'rxjs';
import * as HomeSelectors from '@modules/home/store/home.selector';
import * as HomeActions from '@modules/home/store/home.action';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public activities = [
    {
      name: 'Lorem ipsum dolor sit Lorem ipsum dolor sit',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel auctor ante. Pellentesque ac magna scelerisque, cursus neque nec, tincidunt risus. Nullam porttitor sem et sodales suscipit. Nunc feugiat eu mi non dictum. Aliquam fringilla molestie consequat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.'
    },
    {
      name: 'Lorem ipsum dolor sit amet',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum maximus nunc, egestas efficitur quam congue sollicitudin. Donec neque risus.'
    },
    {
      name: 'Lorem ipsum dolor sit',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel auctor ante. Pellentesque ac magna scelerisque, cursus neque nec, tincidunt risus. Nullam porttitor sem et sodales suscipit. Nunc feugiat eu mi non dictum. Aliquam fringilla molestie consequat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.'
    },
    {
      name: 'Lorem ipsum dolor sit amet',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae erat rutrum, lobortis leo nec, facilisis massa. Aenean accumsan fringilla semper. Sed at mi sapien. Nulla bibendum sem ligula, sit.'
    }, {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum elementum erat, eget tincidunt mauris vestibulum in. Maecenas pretium elit ut ligula semper aliquet. Aliquam erat volutpat. Etiam eleifend justo eros, non tristique leo placerat vitae. Sed efficitur lacinia finibus.'
    }

  ]

  public homeState$: Observable<HomeState> = this.store$.select(HomeSelectors.selectHomeState);

  constructor(
    private store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(HomeActions.HomeGetAll());
  }

}
