import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { RestaurantsListComponent } from './components/guest-components/restaurants-list/restaurants-list.component';
import { RestaurantDetailsComponent } from './components/guest-components/restaurant-details/restaurant-details.component';
import { MenuComponent } from './components/guest-components/menu/menu.component';
import { CartComponent } from './components/guest-components/cart/cart.component';
import { FeedbackFormComponent } from './components/guest-components/feedback-form/feedback-form.component';
import { NewGuestComponent } from './components/guest-components/new-guest/new-guest.component';
import { DashboardComponent } from './components/restaurant-components/dashboard/dashboard.component';
import { DailyOrdersComponent } from './components/restaurant-components/daily-orders/daily-orders.component';
import { IncomingOrdersComponent } from './components/restaurant-components/incoming-orders/incoming-orders.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { ErrorComponent } from './components/error/error.component';
import { PaymentComponent } from './components/guest-components/payment/payment.component';
import { FeedbackSubmittedComponent } from './components/guest-components/feedback-submitted/feedback-submitted.component';
import { TableReservationComponent } from './components/guest-components/table-reservation/table-reservation.component';
import { ReservationMapComponent } from './components/restaurant-components/reservation-map/reservation-map.component';
import { EditDetailsComponent } from './components/restaurant-components/edit-details/edit-details.component';
import { EditMenuComponent } from './components/restaurant-components/edit-menu/edit-menu.component';

import { MsalModule, MsalGuard } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType  } from '@azure/msal-browser';
import { LoginPopComponent } from './components/login-pop/login-pop.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsListComponent,
    RestaurantDetailsComponent,
    MenuComponent,
    CartComponent,
    FeedbackFormComponent,
    NewGuestComponent,
    DashboardComponent,
    DailyOrdersComponent,
    IncomingOrdersComponent,
    PageNotFoundComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    NewPasswordComponent,
    ErrorComponent,
    PaymentComponent,
    FeedbackSubmittedComponent,
    TableReservationComponent,
    ReservationMapComponent,
    EditDetailsComponent,
    EditMenuComponent,
    LoginPopComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: 'ec2c14e2-2347-498d-898c-58ce18af7b3c', // Application (client) ID from the app registration
        authority: 'https://login.microsoftonline.com/8b88d967-723c-496b-9f24-8c58f29f5d24/oauth2/v2.0/authorize', // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
        redirectUri: 'http://localhost:4200'// This is your redirect URI
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      }
    }), {
      interactionType: InteractionType.Redirect, // MSAL Guard Configuration
      authRequest: {
        scopes: ['user.read']
      }
    }, null)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
