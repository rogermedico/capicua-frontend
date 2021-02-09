import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { combineLatest, Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector';
import * as AuthSelectors from '@modules/auth/store/auth.selector';
import { filter, map, skipWhile, take, tap } from 'rxjs/operators';
import { UserState } from '@modules/user/store/user.state';
import { Meta } from '@angular/platform-browser';
import { AuthState } from '@modules/auth/store/auth.state';
import { UserTypesState } from '@store/user-types/user-types.state';
import * as UserTypesSelectors from '@store/user-types/user-types.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('getStylesElement') getStylesElement: ElementRef;
  @ViewChild('sidenav') sidenav: ElementRef;

  public title: string = 'capicua-intranet-app';

  public authState$: Observable<AuthState> = this.store$.select(AuthSelectors.selectAuthState);
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userTypesState$: Observable<UserTypesState> = this.store$.select(UserTypesSelectors.selectUserTypesState);

  public sidenavOpened: boolean;
  public sidenavMode: string;
  public sidenavMarginTop: number;
  public sidenavDisableClose: boolean;

  public XSmallBreakpointSubscriber: Subscription;
  public smallBreakpointSubscriber: Subscription;
  public largeBreakpointSubscriber: Subscription;
  public authStateSubscriber: Subscription;
  public userTypesStateSubscriber: Subscription;

  public allowedToUsers: Observable<boolean>;

  constructor(private meta: Meta, private store$: Store<AppState>, private bpo: BreakpointObserver/*, private router: Router*/) { }

  ngOnInit(): void {
    this.XSmallBreakpointSubscriber = this.bpo.observe([Breakpoints.XSmall]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.sidenavOpened = false;
        this.sidenavDisableClose = false;
        this.sidenavMode = "push";
        this.sidenavMarginTop = 56;
      }
    });
    this.smallBreakpointSubscriber = this.bpo.observe([Breakpoints.Small]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.sidenavOpened = false;
        this.sidenavDisableClose = false;
        this.sidenavMode = "push";
        this.sidenavMarginTop = 64;
      }
    });
    this.largeBreakpointSubscriber = this.bpo.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.sidenavOpened = true;
        this.sidenavDisableClose = true;
        this.sidenavMode = "side";
        this.sidenavMarginTop = 64;
      }
    });

    const combinedUserUserTypes = combineLatest([this.userState$, this.userTypesState$]);
    this.allowedToUsers = combinedUserUserTypes.pipe(
      // skipWhile(([user, userTypes]) => {
      //   return user.user == null || user.loading || userTypes.userTypes == null || userTypes.loading;
      // }),
      filter(([user, userTypes]) => {
        return user.user != null && userTypes.userTypes != null;
      }),
      map(([user, userTypes]) => {
        const userRanks = userTypes.userTypes.map(ut => ut.rank);
        return user.user.userType.rank < Math.max(...userRanks);
      })
    );
  }

  ngAfterViewInit() {
    this.authStateSubscriber = this.authState$.pipe(
      filter(as => as.authInfo !== null),
      take(1),
      tap(() => {
        const primaryColor = getComputedStyle(this.getStylesElement.nativeElement).color;
        console.log('color:', primaryColor);
        this.meta.addTags([
          { name: 'theme-color', content: primaryColor }, //firefox,chrome,opera
          { name: 'msapplication-navbutton-color', content: primaryColor }, //windows phone
          { name: 'apple-mobile-web-app-status-bar-style', content: primaryColor }, // ios safary
        ])
      })
    ).subscribe()

  }

  onsidenavClick() {
    const sidenavClick = new EventEmitter();
    console.log(sidenavClick)
  }

  ngOnDestroy(): void {
    this.XSmallBreakpointSubscriber.unsubscribe();
    this.smallBreakpointSubscriber.unsubscribe();
    this.largeBreakpointSubscriber.unsubscribe();
    this.authStateSubscriber.unsubscribe();
    this.userTypesStateSubscriber.unsubscribe();
  }

}
