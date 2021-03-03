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
import { Education, EducationBackend, EducationBackendSent } from "@models/education.model";
import { Language, LanguageBackend, LanguageBackendSent } from "@models/language.model";

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

  editProfile(updatedProperties: { [key: string]: any }): Observable<User> {
    console.log(updatedProperties)
    return this.http.put<UserBackend>(environment.backend.api + environment.backend.userEndpoint, updatedProperties).pipe(
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

  updateCourse(course: Course): Observable<{ course: Course }> {
    const courseBackend: CourseBackendSent = this.parser.courseToBackendCourse(course);
    return this.http.put<CourseBackend>(environment.backend.api + environment.backend.courseEndpoint, courseBackend).pipe(
      map((cb: CourseBackend) => {
        return { course: this.parser.courseBackendToCourse(cb) };
      })
    )
  }

  deleteCourse(courseId: number): Observable<{ courseId: number }> {
    return this.http.delete(`${environment.backend.api}${environment.backend.courseEndpoint}/${courseId}`).pipe(
      map(() => {
        return { courseId: courseId }
      })
    )
  }

  createEducation(education: Education): Observable<{ education: Education }> {
    const educationBackend: EducationBackendSent = this.parser.educationToEducationBackend(education);
    return this.http.post<EducationBackend>(environment.backend.api + environment.backend.educationEndpoint, educationBackend).pipe(
      map((eb: EducationBackend) => {
        return { education: this.parser.educationBackendToEducation(eb) };
      })
    )
  }

  updateEducation(education: Education): Observable<{ education: Education }> {
    const educationBackend: EducationBackendSent = this.parser.educationToEducationBackend(education);
    return this.http.put<EducationBackend>(environment.backend.api + environment.backend.educationEndpoint, educationBackend).pipe(
      map((eb: EducationBackend) => {
        return { education: this.parser.educationBackendToEducation(eb) };
      })
    )
  }

  deleteEducation(educationId: number): Observable<{ educationId: number }> {
    return this.http.delete(`${environment.backend.api}${environment.backend.educationEndpoint}/${educationId}`).pipe(
      map(() => {
        return { educationId: educationId }
      })
    )
  }

  createLanguage(language: Language): Observable<{ language: Language }> {
    const languageBackend: LanguageBackend = this.parser.languageToLanguageBackend(language);
    return this.http.post<LanguageBackend>(environment.backend.api + environment.backend.languageEndpoint, languageBackend).pipe(
      map((lb: LanguageBackend) => {
        return { language: this.parser.languageBackendToLanguage(lb) };
      })
    )
  }

  updateLanguage(language: Language): Observable<{ language: Language }> {
    const languageBackend: LanguageBackend = this.parser.languageToLanguageBackend(language);
    return this.http.put<LanguageBackend>(environment.backend.api + environment.backend.languageEndpoint, languageBackend).pipe(
      map((lb: LanguageBackend) => {
        return { language: this.parser.languageBackendToLanguage(lb) };
      })
    )
  }

  deleteLanguage(languageId: number): Observable<{ languageId: number }> {
    return this.http.delete(`${environment.backend.api}${environment.backend.languageEndpoint}/${languageId}`).pipe(
      map(() => {
        return { languageId: languageId }
      })
    )
  }

  updateAvatar(avatar: File): Observable<{ avatar: SafeResourceUrl }> {
    const formData: FormData = new FormData();
    formData.append('avatar', avatar, avatar.name);
    return this.http.post<{ avatar: string, extension: string }>(`${environment.backend.api}${environment.backend.avatarEndpoint}`, formData).pipe(
      map(response => {
        return { avatar: this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/${response.extension};base64,${response.avatar}`) }
      })
    )
  }

  deleteAvatar(): Observable<any> {
    return this.http.delete(`${environment.backend.api}${environment.backend.avatarEndpoint}`);
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
