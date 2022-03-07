import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/guest-components/cart/cart.component';
import { FeedbackFormComponent } from './components/guest-components/feedback-form/feedback-form.component';
import { MenuComponent } from './components/guest-components/menu/menu.component';
import { NewGuestComponent } from './components/guest-components/new-guest/new-guest.component';
import { RestaurantDetailsComponent } from './components/guest-components/restaurant-details/restaurant-details.component';
import { RestaurantsListComponent } from './components/guest-components/restaurants-list/restaurants-list.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NewRestaurantComponent } from './components/restaurant-components/new-restaurant/new-restaurant.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register/guest', component: NewGuestComponent },
  { path: 'register/restaurant', component: NewRestaurantComponent },
  
  { path: 'search', component: RestaurantsListComponent },
  { path: 'restaurant/:id', component: RestaurantDetailsComponent },
  
  {
    path: 'restaurant/:id/menu',
    component: MenuComponent,
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
    path: 'user/:id/feedback',
    component: FeedbackFormComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/search', pathMatch: 'full' },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
