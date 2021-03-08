import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { BackendResponse } from '@models/backend-response.model';
import { Course, CourseBackend, CourseBackendSent } from '@models/course.model';
import { Education, EducationBackend, EducationBackendSent } from '@models/education.model';
import { Language, LanguageBackend, LanguageBackendSent } from '@models/language.model';
import { NewUser, User, UserBackend } from '@models/user.model';
import { ParserService } from '@services/parser.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private parser: ParserService, private sanitizer: DomSanitizer) { }

  getUsers(): Observable<User[]> {
    return this.http.get<UserBackend[]>(environment.backend.api + environment.backend.usersEndpoint).pipe(
      map(usersBackend => {
        return usersBackend.map(userBackend => this.parser.userBackendToUser(userBackend))
      })
    );
  }

  newUser(newUser: NewUser): Observable<User> {
    return this.http.post<UserBackend>(environment.backend.api + environment.backend.userEndpoint, newUser).pipe(
      map(userBackend => this.parser.userBackendToUser(userBackend))
    );
  }

  editUser(id: number, editedProperties: { [key: string]: any }): Observable<User> {
    const body = {
      ...editedProperties,
      user_id: id
    }
    console.log(body);
    return this.http.put<UserBackend>(environment.backend.api + environment.backend.usersEndpoint, body).pipe(
      map(userBackend => this.parser.userBackendToUser(userBackend))
    );
  }

  getAvatar(userId: number): Observable<{ userId: number, avatar: SafeResourceUrl }> {
    return this.http.get<{ avatar: string, extension: string }>(`${environment.backend.api}${environment.backend.avatarEndpoint}/${userId}`).pipe(
      map(response => {
        const a = {
          userId: userId,
          avatar: this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/${response.extension};base64,${response.avatar}`)
        }
        console.log(a);
        return a
      })
    );
  }

  activateUser(id: number): Observable<{ userId: number }> {
    const body = {
      user_id: id
    }
    return this.http.post<BackendResponse>(environment.backend.api + environment.backend.activateEndpoint, body).pipe(
      map(() => {
        return { userId: id }
      })
    );
  }

  deactivateUser(id: number): Observable<{ userId: number }> {
    const body = {
      user_id: id
    }
    return this.http.post<BackendResponse>(environment.backend.api + environment.backend.deactivateEndpoint, body).pipe(
      map(() => {
        return { userId: id }
      })
    );;
  }

  deleteUser(id: number): Observable<{ userId: number }> {
    return this.http.delete<BackendResponse>(`${environment.backend.api}${environment.backend.userEndpoint}/${id}`).pipe(
      map(() => {
        return { userId: id }
      })
    );;
  }

}
