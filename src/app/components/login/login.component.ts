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
  notFoundError: string

  constructor(private authService: AuthService,
    private router: Router, 
    private cartService: CartService) { }

  ngOnInit(): void { }

  onSubmit() {
    this.authService.getGuestName(this.guest)
      .subscribe(
        g => {
          if (g.email !== "") {
            console.log("Found user: " + g.username)
            this.authService.setActiveGuest(g);
            let rId = this.cartService.getVisitedId();
            if (rId != -1) {
              this.router.navigateByUrl("restaurant/" + rId + "/menu")
            } else {
              this.router.navigateByUrl("search")
            }
          } else {
            console.log("User not found.");
            this.notFoundError = "User not found! Check your e-mail and password.";
          }
        })
  }
}
