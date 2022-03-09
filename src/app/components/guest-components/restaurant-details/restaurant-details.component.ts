import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant.type';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  restaurant: Restaurant
  id: number

  constructor(private route: ActivatedRoute,
    private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getRestaurantById(this.id)
    });
  }

  public getRestaurantById(id: number) {
    this.restaurantService.getRestaurantById(id)?.subscribe(
      rest => {
        if (rest) {
          this.restaurant = rest
        } else {
          this.restaurant = null
        }
      });
  }
  
  public times(n: number) :  Array<number>{
    return Array(n);
  }
}
