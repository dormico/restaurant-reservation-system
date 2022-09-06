import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MenuItem, Restaurant } from '../models/restaurant.type';
import { RestaurantResults } from '../models/test.type';
import { catchError, retry } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private url: string = "https://restaurant-func-app-1.azurewebsites.net/api/"
  //private url: string = "http://localhost:7071/api/"

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getRestaurantById(id: string): Observable<Restaurant> | null {
    let activeUrl = this.url + "restaurantitems/" + id + "/" + id;
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
  public addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    let activeUrl = this.url + "addRestaurant";
    console.log("Calling " + activeUrl);
    let rJson = JSON.stringify(restaurant);
    console.log("Sending the json: "+rJson);
    var rId = "";
    let res =  this.http.post<Restaurant>(activeUrl, rJson)
      .pipe(
        catchError(this.config.handleError)
      );
    res.subscribe(r => rId = r.id);
    console.log("New restaurant successfully added with ID " + res);
    return res;
  }
}
