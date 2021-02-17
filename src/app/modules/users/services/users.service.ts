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

  createCourse(userId: number, course: Course): Observable<{ userId: number, course: Course }> {
    const courseBackend: CourseBackendSent = this.parser.courseToBackendCourse(userId, course);
    return this.http.post<CourseBackend>(environment.backend.api + environment.backend.courseEndpoint, courseBackend).pipe(
      map((cb: CourseBackend) => {
        return { userId: userId, course: this.parser.courseBackendToCourse(cb) };
      })
    )
  }

  updateCourse(userId: number, course: Course): Observable<{ userId: number, course: Course }> {
    const courseBackend: CourseBackendSent = this.parser.courseToBackendCourse(userId, course);
    return this.http.put<CourseBackend>(environment.backend.api + environment.backend.courseEndpoint, courseBackend).pipe(
      map((cb: CourseBackend) => {
        return { userId: userId, course: this.parser.courseBackendToCourse(cb) };
      })
    )
  }

  deleteCourse(userId: number, courseId: number): Observable<{ userId: number, courseId: number }> {
    return this.http.delete(`${environment.backend.api}${environment.backend.courseEndpoint}/${userId}/${courseId}`).pipe(
      map(() => {
        return { userId: userId, courseId: courseId }
      })
    )
  }


}
