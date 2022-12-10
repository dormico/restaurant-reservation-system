import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderedDish } from 'src/app/models/order.type';
import { MenuItem } from 'src/app/models/restaurant.type';
import { CartService } from 'src/app/services/cart.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public orders: OrderedDish[]
  public reservation: Order

  constructor(private cartService: CartService,
    private emailService: EmailService,
    private router: Router,
    private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initOrders();
    this.initReservation();
  }
  private initOrders() {
    this.orders = this.cartService.getOrders();
    this.orders.forEach(element => {
      console.log("dish name:" + element.dish.name);
    });
  }
  private initReservation() {
    this.reservation = this.cartService.getReservationData();
  }
  public calcSumPrice(dishId: string, price: number): number {
    return this.cartService.calcSumPrice(dishId, price);
  }
  public addDish(dish: MenuItem) {
    this.cartService.addDish(dish);
  }
  public removeDish(dishId: string) {
    this.cartService.removeDish(dishId);
    if (this.orders.length == 0) {
      this.goToMenu();
    }
  }
  public removeAllServings(dishId: string) {
    this.cartService.removeAllServings(dishId);
    if (this.orders.length == 0) {
      this.goToMenu();
    }
  }
  public goToMenu() {
    let rId = this.cartService.getRestaurantId();
    this.router.navigateByUrl('/restaurant/' + rId + '/menu');
  }
  public goToPayment() {
    this.cartService.saveOrder();
    let uId;
    this.actRoute.params.subscribe(params => {
      uId = +params['id'];
    });
    this.router.navigateByUrl('/user/' + uId + '/payment');
  }
}
