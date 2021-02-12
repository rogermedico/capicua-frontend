import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { NewUser, User, UserBackend } from '@models/user.model';
import { UserParserService } from '@services/user-parser.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private userParserService: UserParserService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<UserBackend[]>(environment.backend.api + environment.backend.usersEndpoint).pipe(
      map(usersBackend => {
        return usersBackend.map(userBackend => this.userParserService.userBackendToUser(userBackend))
      })
    );
  }

  newUser(newUser: NewUser): Observable<User> {
    return this.http.post<UserBackend>(environment.backend.api + environment.backend.userEndpoint, newUser).pipe(
      map(userBackend => this.userParserService.userBackendToUser(userBackend))
    );
  }

  editUser(id: number, updatedProperties: { [key: string]: string | number | Date | boolean }): Observable<User> {
    return this.http.post<UserBackend>(environment.backend.api + environment.backend.userEndpoint + '/' + id, updatedProperties).pipe(
      map(userBackend => this.userParserService.userBackendToUser(userBackend))
    );
  }


}
