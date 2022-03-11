import { Component, OnInit } from '@angular/core';
import { Guest } from 'src/app/models/guest.type';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //TODO: Subscribe to modifications
  guest: Guest | null

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getGuest()
  }
  private getGuest(){
    this.guest = this.authService.getActiveGuest()
  }
}
