import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Guest } from 'src/app/models/guest.type';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public guest: Guest = { email: "", username: "", password: "" };

  private unsubscribe: Subject<any> = new Subject<any>();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getActiveGuest()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        g => this.guest = g
      );
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  public logout(): void {
    this.authService.logout();
  }
  public validGuest(): boolean {
    return this.guest.email !== "" && this.guest.password !== "" && this.guest.username !== "" ? true : false;
  }
}
