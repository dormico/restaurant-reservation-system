import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KitchenStyle, MenuItem, Restaurant, RestaurantResults } from '../models/restaurant.type';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private url: string = "https://restaurant-func-app-2.azurewebsites.net/api/"
  //private url: string = "http://localhost:7071/api/"

  constructor(private http: HttpClient) { }

  public get Url(): string {
    return this.url;
  }
  public getRestaurantById(id: string): Observable<Restaurant> | null {
    let activeUrl = this.url + "restaurantitems/" + id;
    let r = this.http.get<Restaurant>(activeUrl);
    console.log('fetched restaurants by URL ' + activeUrl);
    console.log('fetched restaurants: ' + r);
    return r;
  }
  public getRestaurants(): Observable<RestaurantResults> {
    let activeUrl = this.url + "getallrestaurants";
    let rlist = this.http.get<RestaurantResults>(activeUrl);
    console.log('fetched restaurants by URL ' + activeUrl);
    console.log('fetched restaurants: ' + rlist);
    return rlist;
  }
  public getRestaurantByName(name: string): Observable<Restaurant[]> {
    let activeUrl: string = this.url + "/" + "?name=" + name
    let rlist = this.http.get<Restaurant[]>(activeUrl)
    console.log('fetched restaurants by URL ' + activeUrl)
    console.log('fetched films: ' + JSON.stringify(rlist));
    return rlist;
  }
  public getRestaurantMenu(restaurantId: string): Observable<MenuItem[]> {
    let activeUrl = this.url + "restaurantitems/" + restaurantId + "/" + restaurantId + "/menu";
    let menu = this.http.get<MenuItem[]>(activeUrl);
    console.log('fetched restaurants by URL ' + activeUrl);
    console.log('fetched restaurants: ' + menu);
    return menu;
  }
  public getStyles() {
    let styles = Object.values(KitchenStyle);
    return styles.slice(0, styles.length / 2);
  }
}
