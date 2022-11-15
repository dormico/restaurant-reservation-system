import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { Guest } from '../models/guest.type';
import { Restaurant } from '../models/restaurant.type';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { RestaurantService } from './restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantAdminService {

  public myRestaurant: Restaurant
  private user: Guest
  private url: string

  constructor(private restaurantService: RestaurantService,
    private authService: AuthService,
    private http: HttpClient,
    private config: ConfigService) {
    this.url = restaurantService.Url;
    this.initRestaurant();
  }
  public get Id() {
    return this.myRestaurant.id;
  }
  public get activeRestaurant() {
    return this.myRestaurant;
  }
  public initRestaurant(){
    this.myRestaurant = {
      id: "",
      name: "",
      address: "",
      phone: "",
      email: "",
      takeaway: false,
      tables: { name: "", fields: [], image: "", size: 0 },
      pricing: 3,
      cardnum: "",
      openingH: 9,
      openingM: 0,
      closingH: 17,
      closingM: 0,
      menu: [],
      style: "",
      website: "",
      rating: 0,
      image: ""
    };
  }
  public initUser(user: Guest): void {
    this.user = user;
  }
  private setUserRestaurant(rId: string): void {
    this.user.restaurant = rId;
  }
  private registerUser(): void {
    this.authService.addGuest(this.user);
  }
  public setRestaurant(g: Guest) {
    this.restaurantService.getRestaurantById(g.restaurant)?.subscribe(
      rest => {
        if (rest) this.myRestaurant = rest;
        else this.myRestaurant = null;
      }
    );
    console.log("Id: " + this.myRestaurant.id + "Restaurant name: " + this.myRestaurant.name);
  }
  public addRestaurant(restaurant: Restaurant): void {
    let activeUrl = this.url + "AddRestaurantOrchestration_HttpStart" /*"addRestaurant"*/ ;
    console.log("Calling " + activeUrl);
    let rJson = JSON.stringify(restaurant);
    console.log("Sending the json: " + rJson);
    this.http.post<string>(activeUrl, rJson)
      .pipe(
        catchError(this.config.handleError)
      )
      .subscribe(r => {
        console.log("Got server response: " + r);
        // this.myRestaurant.id = r;
        // if (this.myRestaurant.id != "") {
        //   console.log("User registration");
        //   this.setUserRestaurant(r);
        //   this.registerUser();
        // }
      });
    console.log("New restaurant successfully added with ID" + this.myRestaurant.id);
  }
  public updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {

    //TODO: implement on backend
    return
  }
}
