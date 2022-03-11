import { Injectable } from '@angular/core';
import { Cart } from '../models/cart.type';
import { MenuItem } from '../models/restaurant.type';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart = {
    email: '',
    restaurantId: -1,
    orders: []
  }

  constructor() { }

  public getRestaurantId(): number {
    return this.cart.restaurantId;
  }
  public setRestaurant(id: number){
    this.cart.restaurantId = id;
  }
  public getOrders(): MenuItem[] {
    return this.cart.orders;
  }
  public addOrder(order: MenuItem){
    this.cart.orders.push(order);
  }
}
