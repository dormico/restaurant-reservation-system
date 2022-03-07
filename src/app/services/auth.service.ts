import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isAuthenticated(): boolean{
    
    //TODO: real authentication
    
    //const token = localStorage.getItem('token');
    //// Check whether the token is expired and return
    //// true or false
    //return !this.jwtHelper.isTokenExpired(token);
    
    return true;
  }
}
