import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration-confirmation',
  templateUrl: './registration-confirmation.component.html',
  styleUrls: ['./registration-confirmation.component.css']
})
export class RegistrationConfirmationComponent implements OnInit {

  code: string = "";
  expectedCode: string;

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getRegCode()
      .subscribe(c => this.expectedCode = c);
  }
  public resendVerificationCode(): void {
    this.authService.sendRegConfirmEmail();
  }
  public userVerified(): void {
    this.authService.addRegisteredGuest();
    this.router.navigateByUrl("login")
  }
}
