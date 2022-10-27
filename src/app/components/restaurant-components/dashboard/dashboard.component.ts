import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant.type';
import { RestaurantAdminService } from 'src/app/services/restaurant-admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private restaurant: Restaurant;

  constructor(private router: Router, 
    private restaurantAdminService: RestaurantAdminService) { }

  ngOnInit(): void {
    this.restaurant = this.restaurantAdminService.activeRestaurant;
  }

  public goToOrders(){
    let rId = this.restaurantAdminService.Id;
    this.router.navigateByUrl('restaurant/'+ rId +'/orders');
  }
  public goToDaily(){
    let rId = this.restaurantAdminService.Id;
    this.router.navigateByUrl('restaurant/'+ rId +'/daily');
  }
  public today(){
    return new Date().toLocaleDateString();
  }
}
