import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { combineLatest, Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector';
import * as AuthSelectors from '@modules/auth/store/auth.selector';
import { filter, map, skipWhile, take, tap } from 'rxjs/operators';
import { UserState } from '@modules/user/store/user.state';
import { Meta } from '@angular/platform-browser';
import { AuthState } from '@modules/auth/store/auth.state';
import { AppConstantsState } from '@store/app-constants/app-constants.state';
import * as AppConstantsSelectors from '@store/app-constants/app-constants.selector';
import * as RouterSelectors from '@store/router/router.selector';
import { UserType } from '@models/user-type.model';
import { MatSidenavContent } from '@angular/material/sidenav';
import { RouterStateUrl } from '@store/router/router.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('getStylesElement') getStylesElement: ElementRef;
  @ViewChild('sidenav') sidenav: ElementRef;
  @ViewChild('sidenavContent') sidenavContent: MatSidenavContent;

  public title: string = 'capicua-intranet-app';

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

    const combinedUserUserTypes = combineLatest([this.userState$, this.userTypes$]);
    this.allowedToUsers = combinedUserUserTypes.pipe(
      // skipWhile(([user, userTypes]) => {
      //   return user.user == null || user.loading || userTypes.userTypes == null || userTypes.loading;
      // }),
      filter(([user, userTypes]) => {
        return user.user != null && userTypes != null;
      }),
      map(([user, userTypes]) => {
        const userRanks = userTypes.map(ut => ut.rank);
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

    this.routerStateUrlSubscriber = combineLatest([this.selectRouterReducer$, this.authState$]).pipe(
      skipWhile(([selectRouterReducer, authState]) => authState.authInfo === null || !selectRouterReducer),
      tap(([selectRouterReducer, authState]) => {
        if (this.sidenavContent) this.sidenavContent.scrollTo({ top: 0, behavior: 'auto' });
      })
    ).subscribe();

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
    this.routerStateUrlSubscriber.unsubscribe();
  }

}
