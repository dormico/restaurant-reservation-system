import { Injectable } from '@angular/core';
import { Guest } from '../models/guest.type';
import { guests } from '../../app/mock/guests.json';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
  
  private nullGuest: Guest = { restaurant: "", username: "", email: "", password: "" }
  private guests: Guest[] = guests;
  private activeGuest = new BehaviorSubject<Guest>(this.nullGuest/*{ username: "Asd", email: "asd@email.com", password: "asd" }*/);

  public isAuthenticated(): boolean {

    //TODO: real authentication

    //const token = localStorage.getItem('token');
    //// Check whether the token is expired and return
    //// true or false
    //return !this.jwtHelper.isTokenExpired(token);
    if (this.activeGuest.value !== this.nullGuest) {
      console.log("active guest name: " + this.activeGuest.value.username);
    }
    return this.activeGuest.value === this.nullGuest ? false : true;
  }
  public getGuestName(g: Guest): Observable<Guest> {
    let guest = guests.find(element => element.email == g.email && element.password == g.password);
    return guest ? of(guest) : of(this.nullGuest);
  }
  public addGuest(g: Guest) {
    this.guests.push(g);
    console.log("AuthService: New user added: " + JSON.stringify(g));
  }
  public getActiveGuest(): Observable<Guest> {
    console.log("active guest mail: " + this.activeGuest.value.email);
    return this.activeGuest;
  }
  public setActiveGuest(g: Guest) {
    this.activeGuest.next(g);
  }
  public logout(): void {
    this.activeGuest.next(this.nullGuest);
    this.router.navigateByUrl('/');
    console.log("User logged out!");
  }
}
