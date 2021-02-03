import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector';
import * as AuthSelectors from '@modules/auth/store/auth.selector';
import { filter, map, skipWhile, take, tap } from 'rxjs/operators';
import { UserState } from '@modules/user/store/user.state';
import { Meta } from '@angular/platform-browser';
import { AuthState } from '@modules/auth/store/auth.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('getStylesElement') getStylesElement: ElementRef;

  public title: string = 'capicua-intranet-app';

  public authState$: Observable<AuthState> = this.store$.select(AuthSelectors.selectAuthState);
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);

  public sidenavOpened: boolean;
  public sidenavMode: string;
  public sidenavMarginTop: number;
  public sidenavDisableClose: boolean;

  public XSmallBreakpointSubscriber: Subscription;
  public smallBreakpointSubscriber: Subscription;
  public largeBreakpointSubscriber: Subscription;
  public userStateSubscriber: Subscription;


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
  }

  ngAfterViewInit() {
    this.userStateSubscriber = this.userState$.pipe(
      filter(us => us.user !== null),
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
    this.userStateSubscriber.unsubscribe();
  }

}
