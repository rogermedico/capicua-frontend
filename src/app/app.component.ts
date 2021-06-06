import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { combineLatest, Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector';
import * as AuthSelectors from '@modules/auth/store/auth.selector';
import { filter, map, skipWhile, tap } from 'rxjs/operators';
import { UserState } from '@modules/user/store/user.state';
import { Meta } from '@angular/platform-browser';
import { AuthState } from '@modules/auth/store/auth.state';
import * as AppConstantsSelectors from '@store/app-constants/app-constants.selector';
import * as RouterSelectors from '@store/router/router.selector';
import { UserType } from '@models/user-type.model';
import { MatSidenavContent } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('getStylesElement') getStylesElement: ElementRef;
  @ViewChild('sidenav') sidenav: ElementRef;
  @ViewChild('sidenavContent') sidenavContent: MatSidenavContent;

  public authState$: Observable<AuthState> = this.store$.select(AuthSelectors.selectAuthState);
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userTypes$: Observable<UserType[]> = this.store$.select(AppConstantsSelectors.selectUserTypes);
  public selectRouterReducer$: Observable<Params> = this.store$.select(RouterSelectors.selectRouterReducer);

  public sidenavOpened: boolean;
  public sidenavMode: string;
  public sidenavMarginTop: number;
  public sidenavDisableClose: boolean;

  public XSmallBreakpointSubscriber: Subscription;
  public smallBreakpointSubscriber: Subscription;
  public largeBreakpointSubscriber: Subscription;
  public authStateSubscriber: Subscription;
  public userTypesStateSubscriber: Subscription;
  public routerStateUrlSubscriber: Subscription;
  public renewToken: Subscription;

  public allowedToUsers: Observable<boolean>;

  constructor(
    private meta: Meta,
    private store$: Store<AppState>,
    private bpo: BreakpointObserver,
    private router: Router
  ) { }

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

    this.allowedToUsers = combineLatest([this.userState$, this.userTypes$]).pipe(
      filter(([us, userTypes]) => {
        return us.user != null && userTypes != null;
      }),
      map(([us, userTypes]) => {
        const userRanks = userTypes.map(ut => ut.rank);
        return us.user.userType.rank < Math.max(...userRanks);
      })
    );

  }

  ngAfterViewInit() {
    this.authStateSubscriber = this.authState$.pipe(
      tap(as => {
        if (as.authInfo !== null) {
          if (!this.meta.getTag('name=theme-color')) {
            const primaryColor = getComputedStyle(this.getStylesElement.nativeElement).color;
            this.meta.addTags([
              { name: 'theme-color', content: primaryColor }, //firefox,chrome,opera
              { name: 'msapplication-navbutton-color', content: primaryColor }, //windows phone
              { name: 'apple-mobile-web-app-status-bar-style', content: primaryColor }, // ios safary
            ])
          }
        }
        else {
          this.meta.removeTag('name=theme-color');
          this.meta.removeTag('name=msapplication-navbutton-color');
          this.meta.removeTag('name=apple-mobile-web-app-status-bar-style');
        }
      })
    ).subscribe()

    this.routerStateUrlSubscriber = combineLatest([this.selectRouterReducer$, this.authState$]).pipe(
      skipWhile(([selectRouterReducer, authState]) => authState.authInfo === null || !selectRouterReducer),
      tap(([selectRouterReducer, authState]) => {
        if (this.sidenavContent) this.sidenavContent.scrollTo({ top: 0, behavior: 'auto' });
      })
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.XSmallBreakpointSubscriber.unsubscribe();
    this.smallBreakpointSubscriber.unsubscribe();
    this.largeBreakpointSubscriber.unsubscribe();
    this.authStateSubscriber.unsubscribe();
    this.userTypesStateSubscriber.unsubscribe();
    this.routerStateUrlSubscriber.unsubscribe();
  }

}
