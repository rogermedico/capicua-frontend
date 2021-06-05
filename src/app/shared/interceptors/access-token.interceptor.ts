import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppState } from '@store/root.state';
import { AuthState } from '@modules/auth/store/auth.state';
import * as AuthSelectors from '@modules/auth/store/auth.selector';
import { Store } from '@ngrx/store';
import { mergeMap, take } from 'rxjs/operators';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {

  public authState$: Observable<AuthState> = this.store$.select(AuthSelectors.selectAuthState);

  constructor(private store$: Store<AppState>) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authState$.pipe(
      take(1),
      mergeMap(as => {
        if (!as.authInfo) {
          return next.handle(request);
        }
        else {
          const accessTokenRequest = request.clone({
            setHeaders: {
              Authorization: `${as.authInfo.tokenType} ${as.authInfo.accessToken}`,
            },
          });
          return next.handle(accessTokenRequest)
        }
      })
    )
  }

}
