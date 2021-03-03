import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { User, UserBackend } from '@models/user.model';
import { environment } from '@environments/environment';
import { Login } from '@models/login.model';
import { ParserService } from "../../../shared/services/parser.service";
import { ChangePassword } from "@models/change-password.model";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Course, CourseBackend, CourseBackendSent } from "@models/course.model";

@Injectable({
  providedIn: "root",
})
export class UserService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private parser: ParserService, private sanitizer: DomSanitizer) { }

  getUser(): Observable<User> {
    return this.http.get<UserBackend>(environment.backend.api + environment.backend.userEndpoint).pipe(
      map(userBackend => this.parser.userBackendToUser(userBackend))
    );
  }

  editProfile(userId: number, updatedProperties: { [key: string]: any }): Observable<User> {
    console.log(updatedProperties)
    return this.http.post<UserBackend>(environment.backend.api + environment.backend.userEndpoint + '/' + userId, updatedProperties).pipe(
      map(userBackend => this.parser.userBackendToUser(userBackend))
    );
  }

  createCourse(course: Course): Observable<{ course: Course }> {
    const courseBackend: CourseBackendSent = this.parser.courseToBackendCourse(course);
    return this.http.post<CourseBackend>(environment.backend.api + environment.backend.courseEndpoint, courseBackend).pipe(
      map((cb: CourseBackend) => {
        return { course: this.parser.courseBackendToCourse(cb) };
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

  createEducation(userId: number, education: Education): Observable<{ userId: number, education: Education }> {
    const educationBackend: EducationBackendSent = this.parser.educationToEducationBackend(userId, education);
    return this.http.post<EducationBackend>(environment.backend.api + environment.backend.educationEndpoint, educationBackend).pipe(
      map((eb: EducationBackend) => {
        return { userId: userId, education: this.parser.educationBackendToEducation(eb) };
      })
    )
  }

  updateEducation(userId: number, education: Education): Observable<{ userId: number, education: Education }> {
    const educationBackend: EducationBackendSent = this.parser.educationToEducationBackend(userId, education);
    return this.http.put<EducationBackend>(environment.backend.api + environment.backend.educationEndpoint, educationBackend).pipe(
      map((eb: EducationBackend) => {
        return { userId: userId, education: this.parser.educationBackendToEducation(eb) };
      })
    )
  }

  deleteEducation(userId: number, educationId: number): Observable<{ userId: number, educationId: number }> {
    return this.http.delete(`${environment.backend.api}${environment.backend.educationEndpoint}/${educationId}`).pipe(
      map(() => {
        return { userId: userId, educationId: educationId }
      })
    )
  }

  createLanguage(userId: number, language: Language): Observable<{ userId: number, language: Language }> {
    const languageBackend: LanguageBackendSent = this.parser.languageToLanguageBackend(userId, language);
    return this.http.post<LanguageBackend>(environment.backend.api + environment.backend.languageEndpoint, languageBackend).pipe(
      map((lb: LanguageBackend) => {
        return { userId: userId, language: this.parser.languageBackendToLanguage(lb) };
      })
    )
  }

  updateLanguage(userId: number, language: Language): Observable<{ userId: number, language: Language }> {
    const languageBackend: LanguageBackendSent = this.parser.languageToLanguageBackend(userId, language);
    return this.http.put<LanguageBackend>(environment.backend.api + environment.backend.languageEndpoint, languageBackend).pipe(
      map((lb: LanguageBackend) => {
        return { userId: userId, language: this.parser.languageBackendToLanguage(lb) };
      })
    )
  }

  deleteLanguage(userId: number, languageId: number): Observable<{ userId: number, languageId: number }> {
    return this.http.delete(`${environment.backend.api}${environment.backend.languageEndpoint}/${languageId}`).pipe(
      map(() => {
        return { userId: userId, languageId: languageId }
      })
    )
  }

  updateAvatar(userId: number, avatar: File): Observable<{ userId: number, avatar: SafeResourceUrl }> {
    const formData: FormData = new FormData();
    formData.append('avatar', avatar, avatar.name);
    return this.http.post<{ avatar: string, extension: string }>(`${environment.backend.api}${environment.backend.avatarEndpoint}/${userId}`, formData).pipe(
      map(response => {
        return {
          userId: userId,
          avatar: this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/${response.extension};base64,${response.avatar}`)
        }
      })
    )
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
    // return this.http.get<{ avatar: string, extension: string }>(`${environment.backend.api}${environment.backend.avatarEndpoint}/${userId}`).pipe(
    //   map(response => {
    //     const a = {
    //       userId: userId,
    //       avatar: this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/${response.extension};base64,${response.avatar}`)
    //     }
    //     console.log(a);
    //     return null
    //   })
    // );
  }

  deleteAvatar(userId: number): Observable<{ userId: number }> {
    return this.http.delete(`${environment.backend.api}${environment.backend.avatarEndpoint}/${userId}`).pipe(
      map(() => {
        return {
          userId: userId
        }
      })
    )
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
