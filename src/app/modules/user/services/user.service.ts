import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { User, UserBackend } from '@models/user.model';
import { environment } from '@environments/environment';
import { Login } from '@models/login.model';
import { ParserService } from "../../../shared/services/parser.service";
import { ChangePassword } from "@models/change-password.model";

@Injectable({
  providedIn: "root",
})
export class UserService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private parser: ParserService) { }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(environment.backend.api);
  // }

  getUser(): Observable<User> {
    return this.http.get<UserBackend>(environment.backend.api + environment.backend.userEndpoint).pipe(
      map(userBackend => this.parser.userBackendToUser(userBackend))
    );
  }

  changePassword(changePassword: ChangePassword): Observable<any> {
    const body = {
      old_password: changePassword.oldPassword,
      password: changePassword.password,
      password_confirmation: changePassword.passwordConfirmation,
    };
    return this.http.post(environment.backend.api + environment.backend.changePasswordEndpoint, body);
  }


  // getUserByEmail(email: string): Observable<User> {
  //   return this.http.get<User>(`${environment.backend.api}/?email=${encodeURIComponent(email)}`).pipe(
  //     map(user => user[0])
  //   );
  // }

  // login(loginInfo: Login): Observable<User> {
  //   return this.getUserByEmail(loginInfo.username).pipe(
  //     mergeMap(user => {
  //       if (user && (user.password === loginInfo.password)) {
  //         user = { ...user, loggedIn: true };
  //         this.http.put<User>(environment.backend.users, user, this.httpOptions);
  //         return of(user);
  //       }
  //       else {
  //         throw 'login error';
  //       }
  //     }),
  //   )
  // }

  // logout(user: User): Observable<any> {
  //   user = { ...user, loggedIn: false };
  //   return this.http.put(environment.backend.users, user, this.httpOptions);
  // }

  // register(user: User): Observable<User> {
  //   return this.getUserByEmail(user.email).pipe(
  //     mergeMap(u => {
  //       if (!u) {
  //         return this.http.post<User>(environment.backend.users, user, this.httpOptions)
  //       }
  //       else {
  //         throw 'register error';
  //       }
  //     })
  //   );

  // }

  // updateUser(user: User): Observable<any> {
  //   return this.http.put(environment.backend.api, user, this.httpOptions);
  // }

}
