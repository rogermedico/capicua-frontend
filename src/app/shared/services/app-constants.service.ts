import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { CourseType } from '@models/course.model';
import { UserType } from '@models/user-type.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppConstantsService {

  constructor(private http: HttpClient) { }

  getUserTypes(): Observable<UserType[]> {
    return this.http.get<UserType[]>(environment.backend.api + environment.backend.userTypesEndpoint);
  }

  getCourseTypes(): Observable<CourseType[]> {
    return this.http.get<CourseType[]>(environment.backend.api + environment.backend.courseTypesEndpoint);
  }

}