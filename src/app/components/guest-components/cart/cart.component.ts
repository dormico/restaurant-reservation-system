import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderedDish } from 'src/app/models/order.type';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
      
  public orders: OrderedDish[]

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.initOrders();
  }
  private initOrders() {
    this.orders = this.cartService.getOrders();
    this.orders.forEach(element => {
      console.log("dish name:" + element.dish.name);
    });
  }
  public goToPayment() {

  }
  public calcSumPrice(dishId: number, price: number): number {
    return this.cartService.calcSumPrice(dishId, price);
  }
  public removeDish(dishId: number) {
    this.cartService.removeAllServings(dishId);
    if(this.orders.length == 0){
      this.goToMenu();
    }
  }
  public goToMenu() {
    let rId = this.cartService.getRestaurantId();
    this.router.navigateByUrl('/restaurant/' + rId + '/menu');
  }
}
