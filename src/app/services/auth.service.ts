import { Injectable } from '@angular/core';
import { Guest } from '../models/guest.type';
import { guests } from '../../app/mock/guests.json';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private nullGuest: Guest = { username: "", email: "", password: "" }
  private guests: Guest[] = guests
  private activeGuest: Guest

  public isAuthenticated(): boolean {

    //TODO: real authentication

    //const token = localStorage.getItem('token');
    //// Check whether the token is expired and return
    //// true or false
    //return !this.jwtHelper.isTokenExpired(token);

    return true;
  }

  public getGuest(g: Guest): Observable<Guest> {
    let guest = guests.find(element => element.email == g.email && element.password == g.password)
    return guest ? of(guest) : of(this.nullGuest);
  }
  public addGuest(g: Guest){
    this.guests.push(g);
  }
  public getActiveGuest(): Guest | null {
    return this.activeGuest ? this.activeGuest : null;
  }
}
