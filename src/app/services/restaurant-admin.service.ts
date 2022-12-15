import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { Restaurant, RestaurantRegistration } from '../models/restaurant.type';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { RestaurantService } from './restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantAdminService {

  private regRestaurant: RestaurantRegistration;
  private myRestaurant: BehaviorSubject<Restaurant>;
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
  public get Password() {
    return this.regRestaurant.password;
  }
  public set Password(pass: string) {
    this.regRestaurant.password = pass;
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
    this.regRestaurant = {
      restaurantItem: this.myRestaurant.value,
      password: ""
    };
  }
  public loadExistingRestaurant(): void {
    this.authService.getActiveGuest()
      .subscribe(g => {
        if (g.restaurant != '') {
          this.restaurantService.getRestaurantById(g.restaurant)
            ?.subscribe(r => {
              if (r) {
                this.myRestaurant.next(r);
              } else {
                this.myRestaurant = null;
              }
            });
        }
        else {
          console.log("Restaurant does not exist for this user: " + g.username);
        }
      });
  }
  public addRestaurant(): void {
    if(this.Restaurant.email == "") return;    
    this.regRestaurant.restaurantItem = this.Restaurant;
    let activeUrl = this.url + "AddRestaurantOrchestration_HttpStart";
    console.log("Calling " + activeUrl);
    console.log("Sending the json: " + JSON.stringify(this.regRestaurant));
    this.http.post<any>(activeUrl, this.regRestaurant)
      .pipe(
        catchError(this.config.handleError)
      )
      .subscribe(res => {
        console.log("Restaurant created successfully");
      });    
  }
}
