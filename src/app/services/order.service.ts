import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Order, OrderResults } from '../models/order.type';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url: string = "https://orders-func-app.azurewebsites.net/api/"
  //private url: string = "http://localhost:7071/api/"

  constructor(private http: HttpClient,
    private config: ConfigService) { }

  public getOrders(rId: string) : Observable<OrderResults> | null{
    let activeUrl = this.url + "GetRestaurantOrders/" + rId;
    let ord = this.http.get<OrderResults>(activeUrl);
    console.log('fetched orders by URL ' + activeUrl);
    console.log('fetched orders: ' + ord);
    return ord;
  }
  public getOrdersToday(rId: string, date: string) : Observable<OrderResults>{
    let activeUrl = this.url + "GetOrdersToday/" + rId + "?date=" + date;
    let ord = this.http.get<OrderResults>(activeUrl);
    console.log('fetched orders by URL ' + activeUrl);
    console.log('fetched orders: ' + ord);
    return ord;
  }
  public addOrder(order: Order){
    let activeUrl = this.url + "AppendNewOrder";
    console.log("Calling " + activeUrl);   
    order = this.formOrder(order); 
    let rJson = JSON.stringify(order);
    console.log("Sending the json: " + rJson);
    var oId = "0";
    this.http.post<string>(activeUrl, rJson)
       .pipe(
         catchError(this.config.handleError)
       )
       .subscribe(o => {
         oId = o;
       });
     console.log("New order successfully added with ID " + oId);
  }
  private formOrder(order: Order){
    var dishes = [];
    order.orders.forEach(o => {
      var dish = {
        dishId: o.dish.dishId,
        name: o.dish.name,
        servings: o.servings,
        price: o.price
      }
      dishes.push(dish);
    });
    order.orders = dishes;
    return order;
  }
}
