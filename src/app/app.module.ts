/* default */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* routing */
import { AppRoutingModule } from './app-routing.module';

/* components */
import { AppComponent } from './app.component';
import { HeaderComponent } from '@views/header/header.component';
import { FooterComponent } from '@views/footer/footer.component';

/* in memory web api */
import { HttpClientModule } from '@angular/common/http';
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
import { MaterialModule } from '@modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
