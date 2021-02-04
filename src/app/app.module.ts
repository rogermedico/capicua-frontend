/* default */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* routing */
import { AppRoutingModule } from './app-routing.module';

/* core components */
import { AppComponent } from './app.component';
import { EmailNotVerifiedComponent } from './components/email-not-verified/email-not-verified.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

/* in memory web api */
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '@services/in-memory-data.service';

/* ngrx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from '@store/root.reducer';
import { effects } from '@store/root.effects';
import { CustomSerializer } from '@store/router/custom-router-serializer';

/* environment */
import { environment } from '@environments/environment';

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
    HeaderComponent,
    FooterComponent,
    EmailNotVerifiedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    AuthModule,
    HttpClientModule,

    /* in memory web api */
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false, delay: 1000 }
    // ),

    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),

    /* router in state */
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
