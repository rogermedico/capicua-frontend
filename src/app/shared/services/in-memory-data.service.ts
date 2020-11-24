import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '@models/user.model';
import { USERS_MOCK_DATA } from '@mock/users.mock';
import { UserType } from '@models/user_type.model';
import { USERS_TYPES_MOCK_DATA } from '@mock/usersTypes.mock';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {

    const users: User[] = USERS_MOCK_DATA;
    const usersTypes: UserType[] = USERS_TYPES_MOCK_DATA;

    return { users, usersTypes };
  }

  // genId(entries: any): number {
  //   return entries.length > 0 ? Math.max(...entries.map(entry => entry.id)) + 1 : 1;
  // }

  genId(users: any): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }

}
