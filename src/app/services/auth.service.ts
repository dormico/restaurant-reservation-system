import { Injectable } from '@angular/core';
import { Guest } from '../models/guest.type';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EmailService } from './email.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = "https://auth-func-app-2.azurewebsites.net/api/";
  private nullGuest: Guest = { restaurant: "", username: "", email: "", password: "" }
  private registrationGuest: Guest;
  private registrationCode = new BehaviorSubject<string>("");
  private activeGuest = new BehaviorSubject<Guest>(this.nullGuest);

  constructor(private http: HttpClient,
    private config: ConfigService,
    private router: Router,
    private emailService: EmailService) {
    this.registrationGuest = {
      restaurant: "",
      username: "",
      email: "",
      password: ""
    };
  }

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
    let activeUrl = this.url + "GetUser/" + g.email;
    var user = this.http.get<Guest>(activeUrl);
    return user;
  }
  public addGuest(g: Guest) {
    let activeUrl = this.url + "AddUser";
    let gJson = JSON.stringify(g);
    console.log("Sending the json: " + gJson);
    this.http.post<string>(activeUrl, gJson)
       .pipe(
         catchError(this.config.handleError)
       )
       .subscribe(u => {
         console.log("AuthService: New user added: " + JSON.stringify(u));
       });   
  }

  public getRegCode():BehaviorSubject<string>{
    return this.registrationCode;
  }
  public addRegisteredGuest(){
    this.addGuest(this.registrationGuest);
  }
  public registerGuest(g: Guest): void {
    this.registrationGuest = g;
    this.sendRegConfirmEmail();
  }
  public sendRegConfirmEmail(): void {
    let code = (Math.floor(Math.random() * (99999 - 10000) + 10000)).toString();
    this.registrationCode.next(code);
    this.emailService.sendRegConfirmEmail(this.registrationGuest.email, code);
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
