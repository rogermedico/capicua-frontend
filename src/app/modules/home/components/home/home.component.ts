import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeState } from '@modules/home/store/home.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { Observable, Subscription } from 'rxjs';
import * as HomeSelectors from '@modules/home/store/home.selector';
import * as UserSelectors from '@modules/user/store/user.selector';
import * as HomeActions from '@modules/home/store/home.action';
import { UserState } from '@modules/user/store/user.state';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@services/notification.service';
import { ParserService } from '@services/parser.service';
import { HomePost } from '@models/home-post.model';
import { EditHomePostDialogComponent } from '../dialogs/edit-home-post-dialog/edit-home-post-dialog.component';
import { map, skipWhile, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public homeState$: Observable<HomeState> = this.store$.select(HomeSelectors.selectHomeState);
  public notificationSubscription: Subscription;

  constructor(
    private store$: Store<AppState>,
    private dialog: MatDialog,
    private parserService: ParserService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(HomeActions.HomeGetAll());
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription) this.notificationSubscription.unsubscribe();
  }

  editHomePost(homePost: HomePost): void {

    const dialogRef = this.dialog.open(EditHomePostDialogComponent, {
      data: {
        title: homePost.title,
        body: homePost.body
      },
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap(updatedProperties => {
        if (updatedProperties) {
          const updatedHomePostProperties = {};
          for (const [k, v] of Object.entries(updatedProperties)) {
            updatedHomePostProperties[this.parserService.translateToBackend(k)] = v;
          };
          this.store$.dispatch(HomeActions.HomeUpdatePost({ homePostId: homePost.id, updatedHomePostProperties: updatedHomePostProperties }));
          this.notificationSubscription = this.homeState$.pipe(
            skipWhile(usersState => usersState.loading),
            take(1),
            map(() => {
              this.notificationService.showMessage('Post edited successfully', 'OK');
            })
          ).subscribe()
        }
      })
    ).subscribe();
  }

}
