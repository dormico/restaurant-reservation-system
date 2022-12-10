import { Component, Input, OnInit } from '@angular/core';
import { SavedOrder } from 'src/app/models/order.type';
import { OrderService } from 'src/app/services/order.service';
import { RestaurantAdminService } from 'src/app/services/restaurant-admin.service';

@Component({
  selector: 'app-incoming-orders',
  templateUrl: './incoming-orders.component.html',
  styleUrls: ['./incoming-orders.component.css']
})
export class IncomingOrdersComponent implements OnInit {
  public ordersNew: SavedOrder[];
  private rId: string;

  constructor(private ras: RestaurantAdminService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.rId = this.ras.Id;
    this.getNewOrders();
  }

  public getNewOrders() {
    this.orderService.getOrders(this.rId)
      .subscribe(o => {
        this.ordersNew = o.orders;
        this.ordersNew.reverse();
        console.log("Got order list: " + JSON.stringify(this.ordersNew));
      });
  }
}
