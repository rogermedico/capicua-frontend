import { Injectable } from "@angular/core";
import { User } from '@models/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ActivitiesFavoritesService {

  constructor() { }

  loadFavorites(user: User): Observable<number[]> {
    const favoriteActivities = JSON.parse(localStorage.getItem(user.email));
    if (favoriteActivities == null) return of([]);
    else return of(favoriteActivities);
  }

  toggleFavorite(user: User, activityId: number): Observable<number[]> {
    const storedFavs: number[] = JSON.parse(localStorage.getItem(user.email));

    if (storedFavs == null) {
      localStorage.setItem(user.email, JSON.stringify([activityId]));
    }
    else {
      const favFound = storedFavs.findIndex(id => id === activityId);
      if (favFound === -1) {
        storedFavs.push(activityId);
        localStorage.setItem(user.email, JSON.stringify(storedFavs));
      }
      else {
        storedFavs.splice(favFound, 1);
        localStorage.setItem(user.email, JSON.stringify(storedFavs));
      }

    }
    return of(JSON.parse(localStorage.getItem(user.email)));
  }


}
