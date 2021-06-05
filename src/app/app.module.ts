import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmailNotVerifiedComponent } from './components/email-not-verified/email-not-verified.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/* ngrx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from '@store/root.reducer';
import { effects } from '@store/root.effects';
import { CustomSerializer } from '@store/router/custom-router-serializer';
import { reduxDevToolsModule } from './redux-devtools';

/* angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@modules/auth/auth.module';
import { MaterialModule } from '@modules/material/material.module';

/* flex layout */
import { FlexLayoutModule } from '@angular/flex-layout';

/* interceptors */
import { AccessTokenInterceptor } from './shared/interceptors/access-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    EmailNotVerifiedComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    AuthModule,
    HttpClientModule,

    /* ngrx */
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),

    /* router in state */
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),

    /* redux devtools extension */
    reduxDevToolsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
