import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { RestaurantsListComponent } from './components/guest-components/restaurants-list/restaurants-list.component';
import { RestaurantDetailsComponent } from './components/guest-components/restaurant-details/restaurant-details.component';
import { MenuComponent } from './components/guest-components/menu/menu.component';
import { CartComponent } from './components/guest-components/cart/cart.component';
import { FeedbackFormComponent } from './components/guest-components/feedback-form/feedback-form.component';
import { NewRestaurantComponent } from './components/restaurant-components/new-restaurant/new-restaurant.component';
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

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsListComponent,
    RestaurantDetailsComponent,
    MenuComponent,
    CartComponent,
    FeedbackFormComponent,
    NewRestaurantComponent,
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
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
