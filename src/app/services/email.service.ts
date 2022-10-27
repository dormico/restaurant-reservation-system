import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { InvoiceEmail, OrderEmail } from '../models/email.type';
import { Order } from '../models/order.type';
import { MenuItem } from '../models/restaurant.type';
import { CartService } from './cart.service';
import { ConfigService } from './config.service';
import { RestaurantService } from './restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private url: string = "https://email-func-app.azurewebsites.net/api/"
  //private url: string = "http://localhost:7071/api/"

  constructor(private http: HttpClient,
    private config: ConfigService,
    private cartService: CartService,
    private restaurantService: RestaurantService) { }

  public sendFeedback(): void {
    let activeUrl = this.url + "SendFeedbackEmail";
    let rlist = this.http.get(activeUrl);
  }
  public sendInvoice(): void {
    let activeUrl = this.url + "SendInvoiceEmail";
    var invoice: InvoiceEmail = {
      email: '',
      restaurantName: '',
      phone: '',
      orders: [],
      sumPrice: 0
    }
    let cart: Order = this.getOrderDetails();
    let menu: MenuItem[];
    invoice.email = cart.guestEmail;
    var sum: number = 0;
    cart.orders.forEach(item => {
      let o = {
        name: item.dish.name,
        amount: item.servings,
        price: item.price
      }
      invoice.orders.push(o);
      sum += item.price*item.servings;
    });
    invoice.sumPrice = sum;
    this.restaurantService.getRestaurantById(cart.restaurantId)
      .subscribe(r => {
        invoice.restaurantName = r.name;
        invoice.phone = r.phone;
        menu = r.menu;

        let iJson = JSON.stringify(invoice);
        console.log("Sending the json: " + iJson);
        this.http.post<string>(activeUrl, iJson)
        .pipe(
          catchError(this.config.handleError)
        )
        .subscribe(r => console.log("Got message: "+ r));
        console.log("Invoice sent to " + activeUrl);
      });
  }
  public sendOrderDetails(): void {
    let activeUrl = this.url + "SendOrderDetailsEmail";
    let cart: Order = this.getOrderDetails();
    var order: OrderEmail = {
      email: cart.guestEmail,
      date: cart.date,
      hour: cart.hour.toString(),
      mins: cart.min.toString(),
      address: "",
      phone: "",
      restaurantName: '',
      orders: []
    }
    cart.orders.forEach(item => {
      let o = {
        name: item.dish.name,
        amount: item.servings
      }
      order.orders.push(o);
    });
    this.restaurantService.getRestaurantById(cart.restaurantId)
      .subscribe(r => {
        order.restaurantName = r.name;
        order.address = r.address;
        order.phone = r.phone;

        let oJson = JSON.stringify(order);
        console.log("Sending the json: " + oJson);
        this.http.post<string>(activeUrl, oJson)
        .pipe(
          catchError(this.config.handleError)
        )
        .subscribe(r => console.log("Got message: "+ r));
        console.log("Order sent to " + activeUrl);
      });
  }
  private getOrderDetails(): Order {
    return this.cartService.getReservationData();
  }
}
