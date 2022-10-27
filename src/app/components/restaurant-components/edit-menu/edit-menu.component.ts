import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/models/restaurant.type';
import { RestaurantAdminService } from 'src/app/services/restaurant-admin.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private ras: RestaurantAdminService) { }

  public menuForm = this.fb.array([
    this.fb.group({
      name: this.fb.control(''),
      description: this.fb.control(''),
      price: this.fb.control(''),
      image: this.fb.control('')
    })
  ]);
  ngOnInit(): void {
    this.initMenuArray();
  }
  private getMenuList() {
    let menu = [];
    for (let i = 0; i < this.menuForm.length; i++) {
      let item = this.menuForm.at(i);
      if (item.value.name != '') {
        let dish: MenuItem = {
          dishId: i.toString(),
          name: item.value.name,
          description: item.value.description,
          price: item.value.price,
          image: item.value.image
        }
        menu.push(dish);
      }
    }
    return menu;
  }
  private initMenuArray() {
    let menu = this.ras.myRestaurant.menu ?? [];
    menu.forEach(item => {
      this.menuForm.push(this.fb.group({
        dishId: this.fb.control(item.dishId),
        name: this.fb.control(item.name),
        description: this.fb.control(item.description),
        price: this.fb.control(item.price),
        image: this.fb.control(item.image)
      }));
    });
  }
  public addNewItem(): void {
    this.menuForm.push(this.fb.group({
      dishId: this.fb.control(''),
      name: this.fb.control(''),
      description: this.fb.control(''),
      price: this.fb.control(''),
      image: this.fb.control('')
    }));
  }
  public deleteItem(i: number): void {
    this.menuForm.removeAt(i);
  }
  public goToMap() {
    this.router.navigateByUrl('register/restaurant/map');
  }
  public saveAndGoToMap() {
    this.ras.myRestaurant.menu = this.getMenuList();
    this.router.navigateByUrl('register/restaurant/map');
  }
}
