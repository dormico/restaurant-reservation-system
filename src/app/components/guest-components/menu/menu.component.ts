import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Order } from 'src/app/models/order.type';
import { MenuItem } from 'src/app/models/restaurant.type';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  @Input() public rName: string
  public menu: MenuItem[]
  public order: Order

  private placeholderImage: string = '../assets/img/menu/tuscan-grilled.jpg';
  private rId: string
  private unsubscribe: Subject<any> = new Subject<any>();

  constructor(private actRoute: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService,
    private authService: AuthService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.getMenu();
    this.getGuest();
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  private getMenu() {
    this.actRoute.params.subscribe(params => {
      this.rId = params['id'];
      this.restaurantService.getRestaurantMenu(this.rId)
        .subscribe(m => {
          this.menu = m;
          this.menu.forEach(item => {
            if(item.image == '' || !item.image) item.image = this.placeholderImage;
          });
        });
    });
  }
  private getGuest() {
    this.authService.getActiveGuest()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(g => {
        if (this.cartService.getGuestEmail() != g.email) {
          this.cartService.newOrder(this.rId, g.email);
        }
      });
  }
  public addDish(dish: MenuItem) {
    this.cartService.addDish(dish);
  }
  public removeDish(dishId: string) {
    this.cartService.removeDish(dishId);
  }
  public getDishCount(dishId): number {
    return this.cartService.getDishCount(dishId);
  }
  public calcSumPrice(dishId: string, price: number): number {
    return this.cartService.calcSumPrice(dishId, price);
  }
  public goToCart() {
    let sId: number;
    sId = this.cartService.getSessionId();
    this.router.navigateByUrl('/user/' + sId + '/cart');
  }
  public isCartDisabled(): boolean {
    let ordLen = this.cartService.getOrders().length === 0 ? true : false;
    return ordLen;
  }
}
