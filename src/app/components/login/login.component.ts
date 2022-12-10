import { Component, OnInit } from '@angular/core';
import { Guest } from 'src/app/models/guest.type';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { RestaurantAdminService } from 'src/app/services/restaurant-admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  guest: Guest = { email: '', username: '', password: '', restaurant: '' }
  notFoundError: string

  constructor(private authService: AuthService,
    private router: Router, 
    private cartService: CartService, 
    private restaurantAdminService: RestaurantAdminService) { }

  ngOnInit(): void { }

  public initRestaurant(){
    this.restaurantAdminService.initRestaurant();
  }

  onSubmit() {
    this.authService.getGuestName(this.guest)
      .subscribe(
        g => {
          if (g.email !== "") {
            console.log("Found user: " + g.username)
            this.authService.setActiveGuest(g);
            if(g.restaurant != ''){
              this.restaurantAdminService.loadExistingRestaurant();
              this.router.navigateByUrl("restaurant/" + g.restaurant + "/dashboard")
            } else {
              let rId = this.cartService.getVisitedId();
              if (rId != "-1") {
                this.router.navigateByUrl("restaurant/" + rId + "/reservation")
              } else {
                this.router.navigateByUrl("search")
              }
            }            
          } else {
            console.log("User not found.");
            this.notFoundError = "User not found! Check your e-mail and password.";
          }
        })
  }
}
