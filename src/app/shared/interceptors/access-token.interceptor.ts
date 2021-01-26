import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppState } from '@store/root.state';
import { AuthState } from '@modules/auth/store/auth.state';
import * as AuthSelectors from '@modules/auth/store/auth.selector';
import { Store } from '@ngrx/store';
import { mergeMap, take } from 'rxjs/operators';
import { Auth } from '@models/auth.model';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {

  public authState$: Observable<AuthState> = this.store$.select(AuthSelectors.selectAuthState);

  constructor(private store$: Store<AppState>) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authState$.pipe(
      take(1),
      mergeMap(as => {
        if (!as.authInfo) {
          console.log('authinterceptor no auth req:', request);
          return next.handle(request);
        }
        else {
          console.log(as.authInfo)
          const accessTokenRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${as.authInfo.accessToken}`,
            },
          });
          console.log('authinterceptor auth req:', accessTokenRequest);
          return next.handle(accessTokenRequest);
        }
      })
    )



  }
}
