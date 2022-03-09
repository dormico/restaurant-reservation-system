import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Restaurant } from '../models/restaurant.type';
import { MockRestaurants } from '../../app/mock/restaurant.json';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private url: string = "https://restaurant-func-app-1.azurewebsites.net/api/restaurantslist"

  constructor(private http: HttpClient) { }

  public getMockRestaurants(): Restaurant[] {
    return MockRestaurants;
  }

  public getRestaurantById(id: number): Observable<Restaurant> | null {
    let rest = MockRestaurants.find(element => element.id == id)
    return rest ? of(rest) : null
  }

  public getRestaurants(): Observable<Restaurant[]> {
    let rlist = this.http.get<Restaurant[]>(this.url)
    console.log('fetched restaurants by URL ' + this.url)
    console.log('fetched films: ' + JSON.stringify(rlist));
    return rlist;
  }
  public getRestaurantByName(name: string): Observable<Restaurant[]> {
    let nameUrl: string = this.url + "/" + "?name=" + name
    let rlist = this.http.get<Restaurant[]>(nameUrl)
    console.log('fetched restaurants by URL ' + nameUrl)
    console.log('fetched films: ' + JSON.stringify(rlist));
    return rlist;
  }
}
