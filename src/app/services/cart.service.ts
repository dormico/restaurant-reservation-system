import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order, OrderedDish } from '../models/order.type';
import { MenuItem, MenuItemResponse } from '../models/restaurant.type';
import { RestaurantService } from './restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private visitedRestaurantId: number = -1;

  private menu: MenuItem[] = []

  private cart: Order = {
    id: -1,
    guestEmail: '',
    restaurantId: -1,
    orders: [{
      dish: {
        dishId: 0,
        name: "",
        description: "",
        price: 0
      }, 
      servings: 0
    }]
  }

  constructor(private restaurantService: RestaurantService) { }

  public setVisitedId(id: number) {
    this.visitedRestaurantId = id;
  }
  public getVisitedId(): number {
    return this.visitedRestaurantId;
  }
  public removeVisitedId(): void {
    this.visitedRestaurantId = -1;
  }
  public newOrder(rId: number, email: string) {
    this.cart = {
      id: Math.trunc(Math.random() * 100000) + 1000,
      restaurantId: rId,
      guestEmail: email,
      orders: []
    }
  }
  public getGuestEmail(): string {
    return this.cart.guestEmail;
  }
  public getRestaurantId(): number {
    return this.cart.restaurantId;
  }
  public setRestaurant(id: number) {
    this.cart.restaurantId = id;
  }
  public getOrders(): OrderedDish[]{
    this.cart.orders.forEach(element => {
      console.log("CartService: dish name:" + element.dish.name);
    });
    return this.cart.orders;
  }
  public addDish(dish: MenuItem) {
    console.log("dish added: " + dish.dishId)
    let dishIndex = this.cart.orders.findIndex(element => element.dish.dishId == dish.dishId);
    if (dishIndex != -1) {
      this.cart.orders[dishIndex].servings++;
    } else {
      this.cart.orders.push(
        {
          dish: dish,
          servings: 1
        }
      );
    }
  }
  public removeDish(dishId: number) {
    console.log("dish removed: " + dishId)
    if (dishId) {
      let dishIndex = this.cart.orders.findIndex(element => element.dish.dishId == dishId);
      if (dishIndex != -1) {
        this.cart.orders[dishIndex].servings > 1
          ? this.cart.orders[dishIndex].servings--
          : this.cart.orders.splice(dishIndex, 1);
      }
    }
  }
  public removeAllServings(dishId: number) {
    let dishIndex = this.cart.orders.findIndex(element => element.dish.dishId == dishId);
    if (dishIndex != -1) {
      this.cart.orders.splice(dishIndex, 1);
    }
  }
  public getDishCount(dishId: number): number {
    let dishIndex = this.cart.orders.findIndex(element => element.dish.dishId == dishId);
    return dishIndex != -1 ? this.cart.orders[dishIndex].servings : 0;
  }
  public calcSumPrice(dishId: number, price: number): number {
    let dishIndex = this.cart.orders.findIndex(element => element.dish.dishId == dishId);
    return dishIndex != -1 ? this.cart.orders[dishIndex].servings * price : 0;
  }
  public getSessionId(): number {
    return this.cart.id;
    // if (this.sessionId) {
    //   return this.sessionId;
    // }
    // else {
    //   this.sessionId = Math.trunc((Math.random() * 100000) + 1000);
    //   return this.sessionId;
    // }
  }
}
