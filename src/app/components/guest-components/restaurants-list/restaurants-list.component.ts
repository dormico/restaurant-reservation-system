import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.type';
import { RestaurantResults } from 'src/app/models/test.type';
import { CartService } from 'src/app/services/cart.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})
export class RestaurantsListComponent implements OnInit {

  public restaurantResults: RestaurantResults;
  private placeholderImage: string = '../assets/img/gallery/gallery-5.jpg';

  constructor(private restaurantService: RestaurantService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.getRestaurantsList();
    this.cartService.removeVisitedId();
  }
  public getRestaurantsList() {
    this.restaurantService.getRestaurants()
      .subscribe(
        re => {
          this.restaurantResults = re;
          this.restaurantResults.restaurants.forEach(r => {
            if(r.image == '' || !r.image) r.image = this.placeholderImage;
          });
        }
      );
  }
  public times(n: number): Array<number> {
    return Array(n);
  }
}
