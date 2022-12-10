import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Order, OrderedDish } from '../models/order.type';
import { MenuItem, Restaurant } from '../models/restaurant.type';
import { EmailService } from './email.service';
import { OrderService } from './order.service';
import { RestaurantService } from './restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private restaurantSubject: Subject<Restaurant> = new Subject<Restaurant>();
  private visitedRestaurantId: string = "-1";
  private cart: Order;
  private currentRestaurant: Restaurant = {
    id: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    takeaway: false,
    tables: { name: "", fields: [], image: "", size: 0 },
    pricing: 0,
    cardnum: "",
    openingH: 0,
    openingM: 0,
    closingH: 0,
    closingM: 0,
    menu: []
  };

  constructor(private restaurantService: RestaurantService,
    private orderService: OrderService,
    private emailService: EmailService) {
    this.restaurantSubject.subscribe(r => this.currentRestaurant = r);
    this.initCart();
  }
  private initCart() {
    this.cart = {
      id: -1,
      guestEmail: '',
      restaurantId: "-1",
      takeaway: false,
      date: '',
      hour: '',
      min: '',
      duration: '',
      tables: [],
      orders: []
    }
  }
  public get restaurant() {
    return this.currentRestaurant;
  }
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
      takeaway: false,
      orders: []
    }
    this.setCurrentRestaurant(rId);
    console.log("Current restaurant's name: " + this.currentRestaurant.name);
  }
  private setCurrentRestaurant(rId: string): void {
    this.restaurantService.getRestaurantById(rId).subscribe(r => this.currentRestaurant = r);
    console.log("Returned restaurant: " + this.currentRestaurant.name);
  }
  public getGuestEmail(): string {
    console.log("guest email in cart: " + this.cart.guestEmail);
    return this.cart.guestEmail;
  }
  public getRestaurantId(): string {
    return this.cart.restaurantId;
  }
  public getTakeaway(): boolean {
    return this.currentRestaurant.takeaway ?? false;
  }
  public setRestaurant(id: string) {
    this.cart.restaurantId = id;
  }
  public getReservationData(): Order {
    let reservation: Order;
    reservation = this.cart;
    return reservation;
  }
  public getOrders(): OrderedDish[] {
    this.cart.orders.forEach(element => {
      console.log("CartService: dish name:" + element.dish.name);

    });
    return this.cart.orders;
  }
  public setTakeaway(takeaway: boolean) {
    this.cart.takeaway = takeaway;
  }
  public setDate(date: string) {
    this.cart.date = date;
  }
  public setHour(time: string) {
    this.cart.hour = time;
  }
  public setMin(time: string) {
    this.cart.min = time;
  }
  public setDuration(duration: string) {
    this.cart.duration = duration;
  }
  public setTables(tables) {
    this.cart.tables = tables;
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
          servings: 1,
          price: dish.price
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
  public initDishes() {
    this.cart.orders = [];
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
  public saveOrder() {
    let order: Order = this.getReservationData();
    this.emailService.sendOrderDetails(order);
    this.emailService.sendInvoice(order);
    this.orderService.addOrder(this.cart);
    this.initCart();
  }
}
