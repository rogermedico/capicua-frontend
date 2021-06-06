import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { BackendResponse } from '@models/backend-response.model';
import { PersonalDocument, PersonalDocumentBackend } from '@models/document.model';
import { NewUser, User, UserBackend } from '@models/user.model';
import { ParserService } from '@services/parser.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private parser: ParserService,
    private sanitizer: DomSanitizer
  ) { }

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
    return this.http.put<UserBackend>(environment.backend.api + environment.backend.usersEndpoint, body).pipe(
      map(userBackend => this.parser.userBackendToUser(userBackend))
    );
  }

  getAvatar(userId: number): Observable<{ userId: number, avatar: SafeResourceUrl }> {
    return this.http.get<{ avatar: string, extension: string }>(`${environment.backend.api}${environment.backend.avatarEndpoint}/${userId}`).pipe(
      map(response => {
        return {
          userId: userId,
          avatar: this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/${response.extension};base64,${response.avatar}`)
        }
      })
    );
  }

  getDni(userId: number): Observable<{ userId: number, dni: string }> {
    return this.http.get(`${environment.backend.api}${environment.backend.dniEndpoint}/${userId}`).pipe(
      map((response: { dni: string, extension: string }) => {
        const byteArray = new Uint8Array(atob(response.dni).split('').map(char => char.charCodeAt(0)));
        const dni = new Blob([byteArray], { type: 'application/pdf' });
        return { userId: userId, dni: window.URL.createObjectURL(dni) };
      })
    )
  }

  getOffenses(userId: number): Observable<{ userId: number, offenses: string }> {
    return this.http.get(`${environment.backend.api}${environment.backend.offensesEndpoint}/${userId}`).pipe(
      map((response: { offenses: string, extension: string }) => {
        const byteArray = new Uint8Array(atob(response.offenses).split('').map(char => char.charCodeAt(0)));
        const offenses = new Blob([byteArray], { type: 'application/pdf' });
        return { userId: userId, offenses: window.URL.createObjectURL(offenses) };
      })
    )
  }

  getCV(userId: number): Observable<{ userId: number, cv: string }> {
    return this.http.get(`${environment.backend.api}${environment.backend.cvEndpoint}/${userId}`).pipe(
      map((response: { cv: string, extension: string }) => {
        const byteArray = new Uint8Array(atob(response.cv).split('').map(char => char.charCodeAt(0)));
        const cv = new Blob([byteArray], { type: 'application/pdf' });
        return { userId: userId, cv: window.URL.createObjectURL(cv) };
      })
    )
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
    );
  }

  deleteUser(id: number): Observable<{ userId: number }> {
    return this.http.delete<BackendResponse>(`${environment.backend.api}${environment.backend.userEndpoint}/${id}`).pipe(
      map(() => {
        return { userId: id }
      })
    );
  }

  getAllPersonalDocumentsInfo(): Observable<PersonalDocument[]> {
    return this.http.get<PersonalDocumentBackend[]>(`${environment.backend.api}${environment.backend.documentsInfoEndpoint}`).pipe(
      map((pd: PersonalDocumentBackend[]) => {
        return pd.map(pd => this.parser.personalDocumentBackendToPersonalDocument(pd));
      })
    );
  }

  getPersonalDocument(documentId: number): Observable<{ userId: number, documentId: number, personalDocument: string }> {
    return this.http.get(`${environment.backend.api}${environment.backend.documentsEndpoint}/${documentId}`).pipe(
      map((response: { id: number, user_id: number, name: string, date: string, document: string, extension: string }) => {
        const byteArray = new Uint8Array(atob(response.document).split('').map(char => char.charCodeAt(0)));
        const document = new Blob([byteArray], { type: 'application/pdf' });
        return { userId: response.user_id, documentId: response.id, personalDocument: window.URL.createObjectURL(document) };
      })
    );
  }

  addPersonalDocument(userId: number, document: File): Observable<PersonalDocument> {
    const formData: FormData = new FormData();
    formData.append('document', document, document.name);
    formData.append('user_id', userId.toString());
    return this.http.post(`${environment.backend.api}${environment.backend.documentsEndpoint}`, formData).pipe(
      map((pdb: PersonalDocumentBackend) => {
        const personalDocument: PersonalDocument = this.parser.personalDocumentBackendToPersonalDocument(pdb);
        personalDocument.file = window.URL.createObjectURL(document);
        return personalDocument;
      })
    )
  }

  deletePersonalDocument(userId: number, documentId: number): Observable<{ userId: number, documentId: number }> {
    return this.http.delete(`${environment.backend.api}${environment.backend.documentsEndpoint}/${documentId}`).pipe(
      map(() => {
        return { userId: userId, documentId: documentId }
      })
    );
  }

}
