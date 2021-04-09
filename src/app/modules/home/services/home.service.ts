import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { BackendResponse } from '@models/backend-response.model';
import { Course, CourseBackend, CourseBackendSent } from '@models/course.model';
import { HomeDocument, HomeDocumentBackend, PersonalDocument, PersonalDocumentBackend } from '@models/document.model';
import { Education, EducationBackend, EducationBackendSent } from '@models/education.model';
import { HomePost, HomePostBackend, HomePostSend } from '@models/home-post.model';
import { Language, LanguageBackend, LanguageBackendSent } from '@models/language.model';
import { NewUser, User, UserBackend } from '@models/user.model';
import { ParserService } from '@services/parser.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private parser: ParserService, private sanitizer: DomSanitizer) { }

  getPosts(): Observable<HomePost[]> {
    return this.http.get<HomePostBackend[]>(environment.backend.api + environment.backend.homeEndpoint).pipe(
      map((homePostsBackend: HomePostBackend[]) => {
        return homePostsBackend.map((homePostBackend: HomePostBackend) => this.parser.homePostBackendToHomePost(homePostBackend))
      })
    );
  }

  newHomePost(newHomePost: HomePostSend): Observable<HomePost> {
    return this.http.post<HomePostBackend>(environment.backend.api + environment.backend.homeEndpoint, newHomePost).pipe(
      map((homePostBackend: HomePostBackend) => this.parser.homePostBackendToHomePost(homePostBackend))
    );
  }

  updateHomePost(id: number, updatedHomePostProperties: { [key: string]: any }): Observable<HomePost> {
    const body = {
      ...updatedHomePostProperties,
      id: id
    }
    return this.http.put<HomePostBackend>(environment.backend.api + environment.backend.homeEndpoint, body).pipe(
      map((homePostBackend: HomePostBackend) => this.parser.homePostBackendToHomePost(homePostBackend))
    );
  }

  // getDni(userId: number): Observable<{ userId: number, dni: string }> {
  //   return this.http.get(`${environment.backend.api}${environment.backend.dniEndpoint}/${userId}`).pipe(
  //     map((response: { dni: string, extension: string }) => {
  //       const byteArray = new Uint8Array(atob(response.dni).split('').map(char => char.charCodeAt(0)));
  //       const dni = new Blob([byteArray], { type: 'application/pdf' });
  //       return { userId: userId, dni: window.URL.createObjectURL(dni) };
  //     })
  //   )
  // }

  // getOffenses(userId: number): Observable<{ userId: number, offenses: string }> {
  //   return this.http.get(`${environment.backend.api}${environment.backend.offensesEndpoint}/${userId}`).pipe(
  //     map((response: { offenses: string, extension: string }) => {
  //       const byteArray = new Uint8Array(atob(response.offenses).split('').map(char => char.charCodeAt(0)));
  //       const offenses = new Blob([byteArray], { type: 'application/pdf' });
  //       return { userId: userId, offenses: window.URL.createObjectURL(offenses) };
  //     })
  //   )
  // }

  // activateUser(id: number): Observable<{ userId: number }> {
  //   const body = {
  //     user_id: id
  //   }
  //   return this.http.post<BackendResponse>(environment.backend.api + environment.backend.activateEndpoint, body).pipe(
  //     map(() => {
  //       return { userId: id }
  //     })
  //   );
  // }

  // deactivateUser(id: number): Observable<{ userId: number }> {
  //   const body = {
  //     user_id: id
  //   }
  //   return this.http.post<BackendResponse>(environment.backend.api + environment.backend.deactivateEndpoint, body).pipe(
  //     map(() => {
  //       return { userId: id }
  //     })
  //   );
  // }

  deleteHomePost(id: number): Observable<{ homePostId: number }> {
    return this.http.delete<BackendResponse>(`${environment.backend.api}${environment.backend.homeEndpoint}/${id}`).pipe(
      map(() => {
        return { homePostId: id }
      })
    );
  }

  // getAllPersonalDocumentsInfo(): Observable<PersonalDocument[]> {
  //   return this.http.get<PersonalDocumentBackend[]>(`${environment.backend.api}${environment.backend.documentsInfoEndpoint}`).pipe(
  //     map((pd: PersonalDocumentBackend[]) => {
  //       return pd.map(pd => this.parser.personalDocumentBackendToPersonalDocument(pd));
  //     })
  //   );
  // }

  // getPersonalDocument(documentId: number): Observable<{ userId: number, documentId: number, personalDocument: string }> {
  //   return this.http.get(`${environment.backend.api}${environment.backend.documentsEndpoint}/${documentId}`).pipe(
  //     map((response: { id: number, user_id: number, name: string, date: string, document: string, extension: string }) => {
  //       const byteArray = new Uint8Array(atob(response.document).split('').map(char => char.charCodeAt(0)));
  //       const document = new Blob([byteArray], { type: 'application/pdf' });
  //       return { userId: response.user_id, documentId: response.id, personalDocument: window.URL.createObjectURL(document) };
  //     })
  //   );
  // }

  addHomePostDocument(homePostId: number, document: File): Observable<HomeDocument> {
    const formData: FormData = new FormData();
    formData.append('document', document, document.name);
    formData.append('home_post_id', homePostId.toString());
    return this.http.post<HomeDocumentBackend>(`${environment.backend.api}${environment.backend.homeDocumentsEndpoint}`, formData).pipe(
      map((homeDocumentBackend: HomeDocumentBackend) => {
        const homeDocument: HomeDocument = this.parser.homeDocumentBackendToHomeDocument(homeDocumentBackend);
        homeDocument.file = window.URL.createObjectURL(document);
        return homeDocument;
      })
    )
  }

  getHomePostDocument(homePostDocumentId: number): Observable<HomeDocument> {
    console.log('HomeService, getHomePostDocument', homePostDocumentId);
    return this.http.get(`${environment.backend.api}${environment.backend.homeDocumentsEndpoint}/${homePostDocumentId}`).pipe(
      map((homeDocumentBackend: HomeDocumentBackend) => {
        const homeDocument: HomeDocument = this.parser.homeDocumentBackendToHomeDocument(homeDocumentBackend);
        const byteArray = new Uint8Array(atob(homeDocumentBackend.document).split('').map(char => char.charCodeAt(0)));
        const document = new Blob([byteArray], { type: 'application/pdf' });
        homeDocument.file = window.URL.createObjectURL(document);
        console.log('returned', homeDocument);
        return homeDocument;
      })
    );
  }

  deleteHomePostDocument(homePostId: number, homePostDocumentId: number): Observable<{ homePostId: number, homePostDocumentId: number }> {
    return this.http.delete(`${environment.backend.api}${environment.backend.homeDocumentsEndpoint}/${homePostDocumentId}`).pipe(
      map(() => {
        return { homePostId: homePostId, homePostDocumentId: homePostDocumentId }
      })
    );
  }

}
