import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant.type';
import { CartService } from 'src/app/services/cart.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  restaurant: Restaurant
  id: number

  constructor(private actRoute: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService, 
    private cartService: CartService) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(params => {
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
  public goToOrder(rId: number){
    this.cartService.setVisitedId(rId);
    this.router.navigateByUrl('/restaurant/'+ rId + '/menu');
  }
  public times(n: number) :  Array<number>{
    return Array(n);
  }
}
