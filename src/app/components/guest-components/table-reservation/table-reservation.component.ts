import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Map, Restaurant, FieldTypes } from 'src/app/models/restaurant.type';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-table-reservation',
  templateUrl: './table-reservation.component.html',
  styleUrls: ['./table-reservation.component.css']
})
export class TableReservationComponent implements OnInit {

  public orderForTakeaway: boolean;
  public reservationForm: FormGroup;
  public FieldTypes = FieldTypes;
  public map: Map = {
    name: '',
    size: 0,
    fields: []
  };
  public placeholderImage: string = '../assets/img/gallery/gallery-1.jpg';

  private rId: string = this.cartService.getVisitedId();
  private unsubscribe: Subject<any> = new Subject<any>();
  private chosenTables: {row: number, col: number}[] = [];

  constructor(private actRoute: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService,
    private fb: FormBuilder,
    private authService: AuthService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.getGuest();
    this.getRestaurant();
    this.reservationForm = new FormGroup({
       takeaway: new FormControl(false),
       date: new FormControl('', Validators.required),
       time: new FormGroup({
         hour: new FormControl('', Validators.required),
         min: new FormControl('', Validators.required)
       }),
       duration: new FormGroup({
         hour: new FormControl(''),
         min: new FormControl('')
       })
    });
     this.reservationForm.get('takeaway').valueChanges.subscribe(value => {
       console.log("validator setting " + value)
      if (value == false) {
        this.reservationForm.get('duration').get('hour').setValidators(Validators.required);
        this.reservationForm.get('duration').get('hour').updateValueAndValidity();
        this.reservationForm.get('duration').get('min').setValidators(Validators.required);
        this.reservationForm.get('duration').get('min').updateValueAndValidity();
      } else {
        this.reservationForm.get('duration').get('hour').clearValidators();
        this.reservationForm.get('duration').get('hour').updateValueAndValidity();
        this.reservationForm.get('duration').get('min').clearValidators();
        this.reservationForm.get('duration').get('min').updateValueAndValidity();
      }
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  private reserved(row: number, col: number): boolean {
    let reservations = this.map.fields[row][col].reserved;
    if(!reservations || reservations.length == 0) return false;
    let intervalStart = this.reservationForm.get('time').get('hour').value * 60 + 
      this.reservationForm.get('time').get('min').value;
    let intervalEnd = intervalStart + (this.reservationForm.get('duration').get('hour').value * 60 +
      this.reservationForm.get('duration').get('min').value);
    for (let i = 0; i < reservations.length; i++) {
      if (reservations[i].end < intervalStart && (reservations[i + 1].start > intervalEnd || !reservations[i + 1])) {
        return false;
      }
    }
    return true;
  }
  private chooseTable(row: number, col: number): void {
    console.log("Table chosen!");
    this.chosenTables.push({row: row, col: col});
  }
  private removeTable(row: number, col: number): void {
    let id = this.chosenTables.findIndex(item => item.row == row && item.col == col);
    this.chosenTables.splice(id, 1);
  }
  private chosen(row: number, col: number): boolean {
    if(this.chosenTables.find(item => item.row == row && item.col == col)) return true;
    return false;
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
  private getRestaurant() {
    this.actRoute.params.subscribe(params => {
      this.rId = params['id'];
      this.restaurantService.getRestaurantById(this.rId)
        .subscribe(r => {
          this.map = r.tables;
          if(this.map && (!this.map.image || this.map.image == '')) this.map.image = this.placeholderImage;
        });
    });
  }
  public isTakeawayAllowed(): boolean {
    return this.cartService.getTakeaway();
  }
  public setTakeaway(): void {
    this.reservationForm.value.takeaway ? (this.orderForTakeaway = false) : (this.orderForTakeaway = true);
  }
  public isNextDisabled(): boolean {
    return !this.reservationForm.valid;
  }
  public goToRestaurant() {
    this.router.navigateByUrl('/restaurant/' + this.rId);
  }
  public goToMenu() {
    this.cartService.setTakeaway(this.reservationForm.value.takeaway);
    this.cartService.setDate(this.reservationForm.value.date);
    let duration = this.reservationForm.value.duration.hour * 60 + this.reservationForm.value.duration.min;
    this.cartService.setHour(this.reservationForm.value.time.hour);
    this.cartService.setMin(this.reservationForm.value.time.min);
    this.cartService.setDuration(duration);
    this.cartService.setTables(this.chosenTables);

    this.cartService.initDishes();

    this.router.navigateByUrl('/restaurant/' + this.rId + '/menu');
  }
}
