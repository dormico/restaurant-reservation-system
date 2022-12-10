import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant, Review } from 'src/app/models/restaurant.type';
import { OrderService } from 'src/app/services/order.service';
import { RestaurantAdminService } from 'src/app/services/restaurant-admin.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public restaurant: Restaurant;
  public ordersNew;
  public ordersToday;
  public answers: string[];

  constructor(private router: Router,
    private ras: RestaurantAdminService,
    private orderService: OrderService,
    private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.setRestaurant();
  }

  private setRestaurant() {
    this.ras.subscribeToRestaurant()
      .subscribe(r => {
        if (r.id) {
          this.restaurant = r;
          console.log("Current Dashboard restaurant: " + JSON.stringify(r));
          console.log("Getting orders' list for Dashboard restaurant: " + r.name);
          this.getNewOrders();
          this.getOrdersToday();
          this.initAnswers();
        }
      });
  }
  private initAnswers(){
    this.answers = new Array(this.restaurant.reviews.length);
    for (var i = 0; i < this.answers.length; i++){
      this.answers[i] = "";
    }
  }
  public getOrdersToday() {
    this.orderService.getOrdersToday(this.restaurant.id, this.today())
      .subscribe(o => {
        this.ordersToday = o.orders;
        console.log("Got order list: " + JSON.stringify(this.ordersToday));
      });
  }
  public getNewOrders() {
    this.orderService.getOrders(this.restaurant.id)
      .subscribe(o => {
        this.ordersNew = o.orders;
        this.ordersNew.reverse();
        this.ordersNew = this.ordersNew.slice(0,3);
        console.log("Got order list: " + JSON.stringify(this.ordersNew));
      });
  }
  public postAnswer(review: Review) {
    review.answer = this.answers[review.id];
    console.log("Answer: " + review.answer + " is the " + review.id + ". answer.");
    this.reviewService.addAnswer(review, this.restaurant.id);
  }
  public goToOrders() {
    let rId = this.ras.Id;
    this.router.navigateByUrl('restaurant/' + rId + '/orders');
  }
  public goToDaily() {
    let rId = this.ras.Id;
    this.router.navigateByUrl('restaurant/' + rId + '/daily');
  }
  public today() {
    return new Date().toISOString().split('T')[0];
  }
  public times(n: number): Array<number> {
    return Array(n);
  }
}
