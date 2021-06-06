import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { BackendResponse } from '@models/backend-response.model';
import { HomeDocument, HomeDocumentBackend } from '@models/document.model';
import { HomePost, HomePostBackend, HomePostSend } from '@models/home-post.model';
import { ParserService } from '@services/parser.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
    private parser: ParserService,
    private sanitizer: DomSanitizer
  ) { }

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

  deleteHomePost(id: number): Observable<{ homePostId: number }> {
    return this.http.delete<BackendResponse>(`${environment.backend.api}${environment.backend.homeEndpoint}/${id}`).pipe(
      map(() => {
        return { homePostId: id }
      })
    );
  }

  moveHomePost(homePostOriginId: number, homePostDestinationId: number): Observable<{ homePostOriginId: number, homePostDestinationId: number }> {
    const body = {}
    return this.http.put(`${environment.backend.api}${environment.backend.homeEndpoint}/${homePostOriginId}/${homePostDestinationId}`, body).pipe(
      map(() => {
        return { homePostOriginId: homePostOriginId, homePostDestinationId: homePostDestinationId }
      })
    );
  }

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
    return this.http.get(`${environment.backend.api}${environment.backend.homeDocumentsEndpoint}/${homePostDocumentId}`).pipe(
      map((homeDocumentBackend: HomeDocumentBackend) => {
        const homeDocument: HomeDocument = this.parser.homeDocumentBackendToHomeDocument(homeDocumentBackend);
        const byteArray = new Uint8Array(atob(homeDocumentBackend.document).split('').map(char => char.charCodeAt(0)));
        const document = new Blob([byteArray], { type: 'application/pdf' });
        homeDocument.file = window.URL.createObjectURL(document);
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
