import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.type';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})
export class RestaurantsListComponent implements OnInit {

  restaurants: Restaurant[];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.getMockRestaurantsList();
  }
  public getMockRestaurantsList() {
    this.restaurants = this.restaurantService.getMockRestaurants();
  }
  public getRestaurantsList() {
    this.restaurantService.getRestaurants()
      .subscribe(re => this.restaurants = re);
  }
  public getRestaurantByName(name: string) {
    this.restaurantService.getRestaurantByName(name)
      .subscribe(re => this.restaurants = re);
  }

  public times(n: number) :  Array<number>{
    return Array(n);
  }
}
