import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@models/user.model';
import { environment } from '@environments/environment';
import { Login } from '@models/login.model';
import { Observable, of, pipe } from 'rxjs';
import { Auth } from '@models/auth.model';
import { catchError } from 'rxjs/operators';
import { AuthBackend } from '@models/auth.model';
import { ResetPassword } from '@models/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  constructor(private http: HttpClient) { }

  login(loginInfo: Login): Observable<AuthBackend> {
    const body = {
      email: loginInfo.username,
      password: loginInfo.password
    }

    return this.http.post<AuthBackend>(environment.backend.api + environment.backend.loginEndpoint, body/*, this.httpOptions*/).pipe(
      catchError(this.handleError)
    )
  }

  logout(): Observable<any> {
    return this.http.post(environment.backend.api + environment.backend.logoutEndpoint, null).pipe(
      catchError(this.handleError)
    );
  }

  sendResetPasswordEmail(email: string): Observable<any> {
    const body = {
      email: email
    }
    return this.http.post(environment.backend.api + environment.backend.forgotPasswordEndpoint, body).pipe(
      catchError(this.handleError)
    )
  }

  resetPassword(resetPassword: ResetPassword): Observable<any> {
    const body = {
      email: resetPassword.email,
      password: resetPassword.password,
      password_confirmation: resetPassword.passwordConfirmation,
      token: resetPassword.token

    }
    return this.http.post(environment.backend.api + environment.backend.resetPasswordEndpoint, body).pipe(
      catchError(this.handleError)
    )
  }

  private handleError() {
    return of(null)
  }

}
