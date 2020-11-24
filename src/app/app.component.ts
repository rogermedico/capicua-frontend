import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '@store/auth/auth.state';
import { AppState } from '@store/root.state';
import { Observable, Subscription } from 'rxjs';
import * as AuthSelectors from '@store/auth/auth.selector';
import { map, skipWhile } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public title: string = 'capicua-intranet-app';

  public authState$: Observable<AuthState> = this.store$.select(AuthSelectors.selectAuthState);

  public sidenavOpened: boolean;
  public sidenavMode: string;
  public sidenavMarginTop: number;

  public XSmallBreakpointSubscriber: Subscription;
  public smallBreakpointSubscriber: Subscription;
  public largeBreakpointSubscriber: Subscription;


  constructor(private store$: Store<AppState>, private bpo: BreakpointObserver/*, private router: Router*/) { }

  ngOnInit(): void {
    this.XSmallBreakpointSubscriber = this.bpo.observe([Breakpoints.XSmall]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        console.log('xs')
        this.sidenavOpened = false;
        this.sidenavMode = "push";
        this.sidenavMarginTop = 56;
      }
    });
    this.smallBreakpointSubscriber = this.bpo.observe([Breakpoints.Small]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        console.log('small')
        this.sidenavOpened = false;
        this.sidenavMode = "push";
        this.sidenavMarginTop = 64;
      }
    });
    this.largeBreakpointSubscriber = this.bpo.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        console.log('large')
        this.sidenavOpened = true;
        this.sidenavMode = "side";
        this.sidenavMarginTop = 64;
      }
    });
  }

  ngOnDestroy(): void {
    this.XSmallBreakpointSubscriber.unsubscribe();
    this.smallBreakpointSubscriber.unsubscribe();
    this.largeBreakpointSubscriber.unsubscribe();
  }



}
