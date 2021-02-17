import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Course, CourseBackend, CourseBackendSent } from '@models/course.model';
import { NewUser, User, UserBackend } from '@models/user.model';
import { ParserService } from '@services/parser.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private parser: ParserService) { }

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

  editProfile(id: number, updatedProperties: { [key: string]: any }): Observable<User> {
    console.log(updatedProperties)
    return this.http.post<UserBackend>(environment.backend.api + environment.backend.userEndpoint + '/' + id, updatedProperties).pipe(
      map(userBackend => this.parser.userBackendToUser(userBackend))
    );
  }

  createCourse(id: number, course: Course): Observable<User> {
    const courseBackend: CourseBackendSent = this.parser.courseToBackendCourse(id, course);
    return this.http.post<UserBackend>(environment.backend.api + environment.backend.courseEndpoint, courseBackend).pipe(
      map(userBackend => this.parser.userBackendToUser(userBackend))
    );
  }


}
