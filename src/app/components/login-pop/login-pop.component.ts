import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login-pop',
  templateUrl: './login-pop.component.html',
  styleUrls: ['./login-pop.component.css']
})
export class LoginPopComponent implements OnInit {
  title = 'msal-angular-tutorial';
  isIframe = false;
  loginDisplay = false;

  constructor(private authService: MsalService) { }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
  }

  login() {
    this.authService.loginPopup()
      .subscribe({
        next: (result) => {
          console.log(result);
          this.setLoginDisplay();
        },
        error: (error) => console.log(error)
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
}
