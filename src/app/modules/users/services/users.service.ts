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

}
