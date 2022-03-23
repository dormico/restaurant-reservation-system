import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Restaurant } from '../models/restaurant.type';
import { RestaurantResults } from '../models/test.type';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  //private url: string = "https://restaurant-func-app-1.azurewebsites.net/api/"
  private url: string = "http://localhost:7071/api/"

  constructor(private http: HttpClient) { }

  public getRestaurantById(id: number): Observable<Restaurant> | null {
    let idUrl = this.url +"restaurantitems/"+ id +"/" + id;
    let r = this.http.get<Restaurant>(idUrl);
    console.log('fetched restaurants by URL ' + idUrl);
    console.log('fetched restaurants: ' + r);
    return r;
  }
  public getRestaurants(): Observable<RestaurantResults> {
    let listUrl = this.url + "getallrestaurants";
    let rlist = this.http.get<RestaurantResults>(listUrl);
    console.log('fetched restaurants by URL ' + listUrl);
    console.log('fetched restaurants: ' + rlist);
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
