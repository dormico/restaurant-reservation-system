import { Injectable } from '@angular/core';
import { Order, OrderedDish } from '../models/order.type';
import { MenuItem } from '../models/restaurant.type';
import { RestaurantService } from './restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private visitedRestaurantId: string = "-1";

  private cart: Order = {
    id: -1,
    guestEmail: '',
    restaurantId: "-1",
    orders: [{
      dish: {
        dishId: "0",
        name: "",
        description: "",
        price: 0
      }, 
      servings: 0
    }]
  }

  constructor(private restaurantService: RestaurantService) { }

  public setVisitedId(id: string) {
    this.visitedRestaurantId = id;
  }
  public getVisitedId(): string {
    return this.visitedRestaurantId;
  }
  public removeVisitedId(): void {
    this.visitedRestaurantId = "-1";
  }
  public newOrder(rId: string, email: string) {
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
  public getRestaurantId(): string {
    return this.cart.restaurantId;
  }
  public setRestaurant(id: string) {
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
  public removeDish(dishId: string) {
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
  public removeAllServings(dishId: string) {
    let dishIndex = this.cart.orders.findIndex(element => element.dish.dishId == dishId);
    if (dishIndex != -1) {
      this.cart.orders.splice(dishIndex, 1);
    }
  }
  public getDishCount(dishId: string): number {
    let dishIndex = this.cart.orders.findIndex(element => element.dish.dishId == dishId);
    return dishIndex != -1 ? this.cart.orders[dishIndex].servings : 0;
  }
  public calcSumPrice(dishId: string, price: number): number {
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
