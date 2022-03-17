import { Injectable } from '@angular/core';
import { Guest } from '../models/guest.type';
import { guests } from '../../app/mock/guests.json';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private nullGuest: Guest = { username: "", email: "", password: "" }
  private guests: Guest[] = guests;
  private activeGuest = new BehaviorSubject<Guest>(null/*{ username: "Asd", email: "asd@email.com", password: "asd" }*/);

  public isAuthenticated(): boolean {

    //TODO: real authentication

    //const token = localStorage.getItem('token');
    //// Check whether the token is expired and return
    //// true or false
    //return !this.jwtHelper.isTokenExpired(token);

    console.log("active guest: " + this.activeGuest.value.username)
    return this.activeGuest ? true : false;
  }
  public getGuestName(g: Guest): Observable<Guest> {
    let guest = guests.find(element => element.email == g.email && element.password == g.password);
    return guest ? of(guest) : of(this.nullGuest);
  }
  public addGuest(g: Guest){
    this.guests.push(g);
  }
  public getActiveGuest(): Observable<Guest> {
    return this.activeGuest;
  }
  public setActiveGuest(g: Guest) {
    this.activeGuest.next(g);
  }
  public logout(): void{
    this.activeGuest.next(null);
    console.log("User logged out!");
  }
}
