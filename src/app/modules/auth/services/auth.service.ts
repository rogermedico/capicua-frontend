import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Login } from '@models/login.model';
import { Observable, of } from 'rxjs';
import { Auth } from '@models/auth.model';
import { catchError } from 'rxjs/operators';
import { ResetPassword } from '@models/reset-password.model';
import { VerifyEmail } from '@models/verify-email.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginInfo: Login): Observable<Auth> {
    const body = {
      email: loginInfo.username,
      password: loginInfo.password
    }

    return this.http.post<Auth>(environment.backend.api + environment.backend.loginEndpoint, body).pipe(
      catchError(this.handleError<Auth>())
    );
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

  sendVerificationEmail() {
    return this.http.get(`${environment.backend.api}${environment.backend.verifyEmailEndpoint}`).pipe(
      catchError(this.handleError)
    )
  }

  verifyEmail(verifyEmail: VerifyEmail): Observable<any> {
    return this.http.get(`${environment.backend.api}${environment.backend.verifyEmailEndpoint}/${verifyEmail.id}/${verifyEmail.hash}`).pipe(
      catchError(this.handleError)
    )
  }

  private handleError<T>(operation: string = 'operation', result?: T) {
    return (error: any) => {
      //do something with operation and error, maybe log somewhere? console.log?
      //console.log(`${operation} failed: ${error.message}`)

      return of(result as T);
    }
  }

}
