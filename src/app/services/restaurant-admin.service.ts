import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  private myRestaurant: BehaviorSubject<Restaurant>;
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
    return this.myRestaurant.value.id;
  }
  public get Restaurant() {
    return this.myRestaurant.value;
  }
  public set Restaurant(r: Restaurant) {
    this.myRestaurant.next(r);
  }
  public subscribeToRestaurant(): Observable<Restaurant> {
    return this.myRestaurant;
  }
  public initRestaurant() {
    this.myRestaurant = new BehaviorSubject<Restaurant>({
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
      reviews: [],
      rating: 0,
      image: ""
    });
  }
  public initUser(user: Guest): void {
    this.user = user;
  }
  public loadExistingRestaurant(): void {
    console.log("LOADING RESTAURANT...");
    this.authService.getActiveGuest()
      .subscribe(g => {
        this.user = g;
        if (g.restaurant != '') {
          this.restaurantService.getRestaurantById(g.restaurant)
            ?.subscribe(r => {
              if (r) {
                this.myRestaurant.next(r);
                console.log("Got restaurant " + r.name + " for user " + g.username);
                console.log("RESTAURANT LOADED!")
              } else {
                this.myRestaurant = null;
                console.log("Restaurant not yet loaded for " + g.username);
              }
            });
        }
        else {
          console.log("Restaurant does not exist for this user: " + g.username);
        }
      });
  }
  private setUserRestaurant(rId: string): void {
    this.user.restaurant = rId;
  }
  private registerUser(): void {
    this.authService.addGuest(this.user);
  }
  // public setRestaurant(g: Guest) {
  //   this.restaurantService.getRestaurantById(g.restaurant)?.subscribe(
  //     rest => {
  //       if (rest) this.myRestaurant.next(rest);
  //       else this.myRestaurant = null;
  //     }
  //   );
  //   console.log("Id: " + this.myRestaurant.value.id + "Restaurant name: " + this.myRestaurant.value.name);
  // }
  public addRestaurant(restaurant: Restaurant): void {
    let activeUrl = this.url + "AddRestaurantOrchestration_HttpStart";
    console.log("Calling " + activeUrl);
    console.log("Sending the json: " + restaurant);
    this.http.post<any>(activeUrl, restaurant)
      .pipe(
        catchError(this.config.handleError)
      )
      .subscribe(rId => {
        console.log("Got server response: " + rId);
        this.myRestaurant.value.id = rId;
        if (this.myRestaurant.value.id != "") {
          console.log("User registration");
          this.setUserRestaurant(rId);
          this.registerUser();
        }
      });
    console.log("New restaurant successfully added with ID" + this.myRestaurant.value.id);
  }
  public updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {

    //TODO: implement on backend
    return
  }
}
