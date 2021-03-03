import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '@environments/environment';
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

  editUser(id: number, updatedProperties: { [key: string]: any }): Observable<User> {
    console.log(updatedProperties)
    return this.http.post<UserBackend>(environment.backend.api + environment.backend.userEndpoint + '/' + id, updatedProperties).pipe(
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

}
