import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantAdminService } from 'src/app/services/restaurant-admin.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Guest } from 'src/app/models/guest.type'

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {

  public styles;
  public hidden: boolean = true;

  public regForm = this.fb.group({
    name: [this.ras.Restaurant.name, Validators.required],
    password: ['', Validators.required],
    address: [this.ras.Restaurant.address, Validators.required],
    phone: [this.ras.Restaurant.phone, Validators.required],
    email: ['', Validators.required],
    takeaway: [this.ras.Restaurant.takeaway, Validators.required],
    pricing: [this.ras.Restaurant.pricing, Validators.required],
    cardnum: [this.ras.Restaurant.cardnum, Validators.required],
    time: this.fb.group({
      openingH: [this.ras.Restaurant.openingH, Validators.required],
      openingM: [this.ras.Restaurant.openingM, Validators.required],
      closingH: [this.ras.Restaurant.closingH, Validators.required],
      closingM: [this.ras.Restaurant.closingM, Validators.required],
    }),
    image: [''],
    website: [this.ras.Restaurant.website],
    style: [this.ras.Restaurant.style]
  });

  constructor(private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private ras: RestaurantAdminService,
    private router: Router) { }

  ngOnInit(): void {
    this.setRestaurant();
    this.getStyles();
  }
  private setRestaurant() {
    this.ras.Restaurant;
  }
  private getStyles() {
    this.styles = this.restaurantService.getStyles();
  }
  private initUser() {
    let user: Guest = {
      restaurant: '',
      username: this.regForm.value.name,
      email: this.regForm.value.email,
      password: this.regForm.value.password
    }
    //this.ras.initUser(user);
  }
  private setRestaurantData(): void {
    let r = this.ras.Restaurant;
    r.name = this.regForm.value.name;
    r.address = this.regForm.value.address;
    r.phone = this.regForm.value.phone;
    r.email = this.regForm.value.email;
    r.takeaway = this.regForm.value.takeaway;
    r.pricing = this.regForm.value.pricing;
    r.cardnum = this.regForm.value.cardnum;
    r.openingH = this.regForm.get('time').value.openingH;
    r.openingM = this.regForm.get('time').value.openingM;
    r.closingH = this.regForm.get('time').value.closingH;
    r.closingM = this.regForm.get('time').value.closingM;
    r.image = this.regForm.value.image;
    r.website = this.regForm.value.website;
    r.style = this.regForm.value.style;
    this.ras.Restaurant = r;
    this.ras.Password = this.regForm.value.password;
  }
  public goToAddMenu() {
    this.initUser();
    this.setRestaurantData();
    this.router.navigateByUrl('register/restaurant/menu');
  }
}
