import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { UserType } from '@models/user-type.model';
import { User, UserBackend } from '@models/user.model';
import { UserParserService } from '@services/user-parser.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserTypesService {

  constructor(private http: HttpClient, private userParserService: UserParserService) { }

  getUserTypes(): Observable<UserType[]> {
    return this.http.get<UserType[]>(environment.backend.api + environment.backend.userTypesEndpoint);
  }
}