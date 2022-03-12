import { Component, OnInit } from '@angular/core';
import { Guest } from 'src/app/models/guest.type';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  guest: Guest = { email: '', username: '', password: '' }
  g: Guest = { email: '', username: '', password: '' }

  constructor(private authService: AuthService,
    private router: Router, private cartService: CartService) { }

  ngOnInit(): void { }

  onSubmit() {
    this.authService.getGuestName(this.guest)
      .subscribe(
        g => {
          if (g.email !== "") {
            this.g = g
            console.log("Found user: " + this.g.username)
            this.authService.setActiveGuest(g);
            let rId = this.cartService.getRestaurantId();
            if (rId != -1) {
              this.router.navigateByUrl("restaurant/" + rId + "/menu")
            } else {
              this.router.navigateByUrl("search")
            }
          } else {
            console.log("No user found.")
          }
        })
  }
}
