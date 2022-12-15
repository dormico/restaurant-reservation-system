import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/guest-components/cart/cart.component';
import { FeedbackFormComponent } from './components/guest-components/feedback-form/feedback-form.component';
import { FeedbackSubmittedComponent } from './components/guest-components/feedback-submitted/feedback-submitted.component';
import { MenuComponent } from './components/guest-components/menu/menu.component';
import { NewGuestComponent } from './components/guest-components/new-guest/new-guest.component';
import { PaymentComponent } from './components/guest-components/payment/payment.component';
import { RestaurantDetailsComponent } from './components/guest-components/restaurant-details/restaurant-details.component';
import { RestaurantsListComponent } from './components/guest-components/restaurants-list/restaurants-list.component';
import { TableReservationComponent } from './components/guest-components/table-reservation/table-reservation.component';
import { LoginComponent } from './components/login/login.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DailyOrdersComponent } from './components/restaurant-components/daily-orders/daily-orders.component';
import { DashboardComponent } from './components/restaurant-components/dashboard/dashboard.component';
import { EditDetailsComponent } from './components/restaurant-components/edit-details/edit-details.component';
import { EditMenuComponent } from './components/restaurant-components/edit-menu/edit-menu.component';
import { IncomingOrdersComponent } from './components/restaurant-components/incoming-orders/incoming-orders.component';
import { ReservationMapComponent } from './components/restaurant-components/reservation-map/reservation-map.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { MsalGuard } from '@azure/msal-angular';
import { RegistrationConfirmationComponent } from './components/registration-confirmation/registration-confirmation.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register/guest', component: NewGuestComponent },
  { path: 'register/restaurant/details', component: EditDetailsComponent },
  { path: 'register/restaurant/menu', component: EditMenuComponent },
  { path: 'register/restaurant/map', component: ReservationMapComponent },
  { path: 'register/confirmation', component: RegistrationConfirmationComponent },
  { path: 'newpass', component: NewPasswordComponent },
  { path: 'feedbackSubmitted', component: FeedbackSubmittedComponent },

  { path: 'search', component: RestaurantsListComponent },
  { 
    path: 'restaurant/:id', 
    component: RestaurantDetailsComponent//, 
    //canActivate: [MsalGuard] 
  },

  {
    path: 'restaurant/:id/reservation',
    component: TableReservationComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'restaurant/:id/menu',
    component: MenuComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'restaurant/:id/dashboard',
    component: DashboardComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'restaurant/:id/orders',
    component: IncomingOrdersComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'restaurant/:id/daily',
    component: DailyOrdersComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'restaurant/:id/details',
    component: EditDetailsComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'restaurant/:id/menu',
    component: EditMenuComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'restaurant/:id/map',
    component: ReservationMapComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'user/:id/cart',
    component: CartComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'user/:id/payment',
    component: PaymentComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'user/:id/feedback',
    component: FeedbackFormComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/search', pathMatch: 'full' },

  { path: '**', component: PageNotFoundComponent }
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: !isIframe ? 'enabled' : 'disabled' // Don't perform initial navigation in iframes
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
