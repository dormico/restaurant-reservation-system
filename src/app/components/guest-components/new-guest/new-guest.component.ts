import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guest } from 'src/app/models/guest.type';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-guest',
  templateUrl: './new-guest.component.html',
  styleUrls: ['./new-guest.component.css']
})
export class NewGuestComponent implements OnInit {

  guest: Guest = { email: '', username: '', password: '', restaurant: '' }
  pw1: string
  pw2: string

  constructor(private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.pw1 === this.pw2) {
      this.guest.password = this.pw1;
      this.authService.addGuest(this.guest);
      this.router.navigateByUrl("\login");
    } else {
      console.log("Passwords doesn't match!");
    }
  }
}
