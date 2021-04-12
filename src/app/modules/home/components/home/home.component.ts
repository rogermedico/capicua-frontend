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
import { HomePost, HomePostSend } from '@models/home-post.model';
import { EditHomePostDialogComponent } from '../dialogs/edit-home-post-dialog/edit-home-post-dialog.component';
import { filter, map, skipWhile, take, tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { NewHomePostDialogComponent } from '../dialogs/new-home-post-dialog/new-home-post-dialog.component';
import { HomeDocument } from '@models/document.model';
import { CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public homeState$: Observable<HomeState> = this.store$.select(HomeSelectors.selectHomeState);
  public homeStateSubscription: Subscription;
  public notificationSubscription: Subscription;
  public getHomeDocumentSubscription: Subscription;
  public posts: HomePost[];

  constructor(
    private store$: Store<AppState>,
    private dialog: MatDialog,
    private parserService: ParserService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(HomeActions.HomeGetAll());
    this.homeStateSubscription = this.homeState$.pipe(
      filter(hs => hs.posts != null),
      map(hs => this.posts = [...hs.posts])
    ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.homeStateSubscription) this.homeStateSubscription.unsubscribe();
    if (this.notificationSubscription) this.notificationSubscription.unsubscribe();
    if (this.getHomeDocumentSubscription) this.getHomeDocumentSubscription.unsubscribe();
  }

  newHomePost(): void {

    const dialogRef = this.dialog.open(NewHomePostDialogComponent);

    dialogRef.afterClosed().pipe(
      take(1),
      tap((newPostProperties: HomePostSend) => {
        if (newPostProperties) {
          // const newPostPropertiesSend = {};
          // for (const [k, v] of Object.entries(newPostProperties)) {
          //   newPostPropertiesSend[this.parserService.translateToBackend(k)] = v;
          // };
          this.store$.dispatch(HomeActions.HomeCreatePost({ newHomePost: newPostProperties }));
          this.notificationSubscription = this.homeState$.pipe(
            skipWhile(usersState => usersState.loading),
            take(1),
            map(() => {
              this.notificationService.showMessage('New post successfully created', 'OK');
            })
          ).subscribe()
        }
      })
    ).subscribe();
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

  deleteHomePost(homePost: HomePost): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        question: 'Are you sure you want to delete the following post:',
        element: homePost.title
      }
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result: boolean) => {
        if (result) {
          this.store$.dispatch(HomeActions.HomeDeletePost({ homePostId: homePost.id }));
          this.notificationSubscription = this.homeState$.pipe(
            skipWhile(usersState => usersState.loading),
            take(1),
            map(() => {
              this.notificationService.showMessage('Post successfully deleted', 'OK');
            })
          ).subscribe()
        }
      })
    ).subscribe();

  }

  uploadHomePostDocument(homePost: HomePost, fileInputEvent: any) {
    const homePostDocumentFile = fileInputEvent.target.files[0];
    this.store$.dispatch(HomeActions.HomeAddPostDocument({ homePostId: homePost.id, document: homePostDocumentFile }));
    this.notificationSubscription = this.homeState$.pipe(
      skipWhile(homeState => homeState.loading),
      take(1),
      map(() => {
        this.notificationService.showMessage('File successfully uploaded', 'OK');
      })
    ).subscribe()
  }

  viewHomeDocument(homeDocument: HomeDocument) {
    console.log(homeDocument);
    if (homeDocument.file) {
      window.open(homeDocument.file, '_blank');
    }
    else {
      this.store$.dispatch(HomeActions.HomeGetPostDocument({ documentId: homeDocument.id }));
      this.getHomeDocumentSubscription = this.homeState$.pipe(
        filter(hs => {
          const homePost = hs.posts.find(post => post.id == homeDocument.homePostId);
          const homePostDocument = homePost.documents.find(hpd => hpd.id == homeDocument.id);
          return homePostDocument.file != null;
        }),
        take(1),
        map(hs => {
          const homePost = hs.posts.find(post => post.id == homeDocument.homePostId);
          const homePostDocument = homePost.documents.find(hpd => hpd.id == homeDocument.id);
          window.open(<string>homePostDocument.file, '_blank');
        })
      ).subscribe();
    }
  }

  deleteHomeDocument(homeDocument: HomeDocument): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        question: 'Are you sure you want to permanently delete the following document:',
        element: homeDocument.name
      }
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result: boolean) => {
        if (result) {
          this.store$.dispatch(HomeActions.HomeDeletePostDocument({ homePostId: homeDocument.homePostId, homePostDocumentId: homeDocument.id }));
          this.notificationSubscription = this.homeState$.pipe(
            skipWhile(homeState => homeState.loading),
            take(1),
            map(() => {
              this.notificationService.showMessage('Document successfully deleted', 'OK');
            })
          ).subscribe()
        }
      })
    ).subscribe();

  }

  moveHomePost(homePost: HomePost, movement: string) {
    console.log(homePost, movement);
    const index = this.posts.findIndex(post => homePost == post);
    console.log(index)
    let destinationHomePost: number;
    if (movement == 'increase') destinationHomePost = this.posts[index + 1].id;
    else destinationHomePost = this.posts[index - 1].id;
    this.store$.dispatch(HomeActions.HomeMovePost({ homePostOriginId: homePost.id, homePostDestinationId: destinationHomePost }));
  }

}
