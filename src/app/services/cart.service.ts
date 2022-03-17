import { Injectable } from '@angular/core';
import { Order, OrderedDish } from '../models/order.type';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private visitedRestaurantId: number = -1;

  private cart: Order = {
    id: -1,
    guestEmail: '',
    restaurantId: -1,
    orders: [{ dishId: 0, servings: 0 }]
  }

  constructor() { }

  public setVisitedId(id: number) {
    this.visitedRestaurantId = id;
  }
  public getVisitedId(): number {
    return this.visitedRestaurantId;
  }
  public removeVisitedId(): void{
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
  public getOrders(): OrderedDish[] {
    return this.cart.orders;
  }
  public addDish(dishId: number) {
    console.log("dish added: " + dishId)
    let dishIndex = this.cart.orders.findIndex(element => element.dishId == dishId);
    if (dishIndex != -1) {
      this.cart.orders[dishIndex].servings++;
    } else {
      this.cart.orders.push(
        {
          dishId: dishId,
          servings: 1
        }
      );
    }
  }
  public removeDish(dishId: number) {
    console.log("dish removed: " + dishId)
    if (dishId) {
      let dishIndex = this.cart.orders.findIndex(element => element.dishId == dishId);
      if (dishIndex != -1) {
        this.cart.orders[dishIndex].servings > 1
          ? this.cart.orders[dishIndex].servings--
          : this.cart.orders.splice(dishIndex, 1)
      }
    }
  }
  public getDishCount(dishId: number): number {
    let dishIndex = this.cart.orders.findIndex(element => element.dishId == dishId);
    return dishIndex != -1 ? this.cart.orders[dishIndex].servings : 0;
  }
  public calcSumPrice(dishId: number, price: number): number {
    let dishIndex = this.cart.orders.findIndex(element => element.dishId == dishId);
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
