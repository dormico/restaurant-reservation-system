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
    name: [this.ras.myRestaurant.name, Validators.required],
    password: ['', Validators.required],
    address: [this.ras.myRestaurant.address, Validators.required],
    phone: [this.ras.myRestaurant.phone, Validators.required],
    email: [this.ras.myRestaurant.email, Validators.required],
    takeaway: [this.ras.myRestaurant.takeaway, Validators.required],
    pricing: [this.ras.myRestaurant.pricing, Validators.required],
    cardnum: [this.ras.myRestaurant.cardnum, Validators.required],
    time: this.fb.group({
      openingH: [this.ras.myRestaurant.openingH, Validators.required],
      openingM: [this.ras.myRestaurant.openingM, Validators.required],
      closingH: [this.ras.myRestaurant.closingH, Validators.required],
      closingM: [this.ras.myRestaurant.closingM, Validators.required],
    }),
    image: [''],
    website: [this.ras.myRestaurant.website],
    style: [this.ras.myRestaurant.style]
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
    this.ras.myRestaurant;
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
    this.ras.initUser(user);
  }
  private setRestaurantData(): void {
    this.ras.myRestaurant.name = this.regForm.value.name;
    this.ras.myRestaurant.address = this.regForm.value.address;
    this.ras.myRestaurant.phone = this.regForm.value.phone;
    this.ras.myRestaurant.email = this.regForm.value.email;
    this.ras.myRestaurant.takeaway = this.regForm.value.takeaway;
    this.ras.myRestaurant.pricing = this.regForm.value.pricing;
    this.ras.myRestaurant.cardnum = this.regForm.value.cardnum;
    this.ras.myRestaurant.openingH = this.regForm.get('time').value.openingH;
    this.ras.myRestaurant.openingM = this.regForm.get('time').value.openingM;
    this.ras.myRestaurant.closingH = this.regForm.get('time').value.closingH;
    this.ras.myRestaurant.closingM = this.regForm.get('time').value.closingM;
    this.ras.myRestaurant.image = this.regForm.value.image;
    this.ras.myRestaurant.website = this.regForm.value.website;
    this.ras.myRestaurant.style = this.regForm.value.style;
  }
  public goToAddMenu() {
    this.initUser();
    this.setRestaurantData();
    this.router.navigateByUrl('register/restaurant/menu');
  }
}
