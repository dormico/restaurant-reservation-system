import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Order } from 'src/app/models/order.type';
import { MenuItem, Restaurant } from 'src/app/models/restaurant.type';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  public menu: MenuItem[]
  public order: Order

  private guestEmail: string
  private rId: number
  private unsubscribe: Subject<any> = new Subject<any>();

  constructor(private actRoute: ActivatedRoute,
    private restaurantService: RestaurantService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getMenu();
    this.initOrder();
    this.getGuest();
    this.startOrder();
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  private getMenu() {
    this.actRoute.params.subscribe(params => {
      this.rId = +params['id'];
      let r: Restaurant;
      this.restaurantService.getRestaurantById(this.rId)
        .subscribe(rest => r = rest);
      this.menu = r.menu;
    });
  }
  private getGuest() {
    this.authService.getActiveGuest()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(g => {
        if (this.order.guestEmail !== '' && this.order.guestEmail != g.email) {
          this.startOrder();
        }
        this.guestEmail = g.email;
      });
  }
  private initOrder() {
    this.order = {
      id: 0,
      restaurantId: 0,
      guestEmail: "",
      orders: [{ dishId: 0, servings: 0 }]
    }
  }
  private startOrder() {
    this.order = {
      id: Math.trunc(Math.random() * 20) + 1,
      restaurantId: this.rId,
      guestEmail: this.guestEmail,
      orders: []
    }
  }
  public addDish(dishId: number) {
    let dishIndex = this.order.orders.findIndex(element => element.dishId == dishId);
    if (dishIndex != -1) {
      this.order.orders[dishIndex].servings++;
    } else {
      this.order.orders.push(
        {
          dishId: dishId,
          servings: 1
        }
      );
    }
  }
  public removeDish(dishId: number) {
    if (dishId) {
      let dishIndex = this.order.orders.findIndex(element => element.dishId == dishId);
      if (dishIndex != -1) {
        this.order.orders[dishIndex].servings > 1
          ? this.order.orders[dishIndex].servings --
          : this.order.orders.splice(dishIndex, 1)
      }
    }
  }
  public getDishCount(dishId: number): number {
    if (dishId) {
      let dishIndex = this.order.orders.findIndex(element => element.dishId == dishId);
      return dishIndex ? this.order.orders[dishIndex].servings : 0;
    }
    return 0;
  }
  public calcSumPrice(dishId: number, price: number) : number{
    if (dishId) {
      let dishIndex = this.order.orders.findIndex(element => element.dishId == dishId);
      if (dishIndex != -1) {
        return this.order.orders[dishIndex].servings * price;
      }
      return 0;
    }
  }
}
