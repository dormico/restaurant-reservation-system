import { Component, OnInit } from '@angular/core';
import { MenuItem, Restaurant, Review } from 'src/app/models/restaurant.type';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})
export class RestaurantsListComponent implements OnInit {

  restaurants: Restaurant[];
  foods: MenuItem[]

  constructor() { }

  ngOnInit(): void {
    this.foods = [
      {
        name: "Dish 1",
        description: "Description",
        price: 123
      },
      {
        name: "Dish 2",
        description: "Description",
        price: 123
      },
      {
        name: "Dish 3",
        description: "Description",
        price: 123
      }
    ]

    this.restaurants = [
      {
        id: 1,
        name: "French Fries",
        address: "Address street 3.",
        phone: "+12 3 456 78",
        email: "fries@email.com",
        takeaway: true,
        cardnum: 11111111111111,
        opening: 8,
        closing: 20,
        menu: this.foods,
        pricing: 3,
        rating: 4
      },
      {
        id: 2,
        name: "Pasta Italiana",
        address: "Address street 2.",
        phone: "+12 3 456 78",
        email: "pasta@email.com",
        takeaway: true,
        cardnum: 11111111111111,
        opening: 8,
        closing: 20,
        menu: this.foods,
        pricing: 3,
        rating: 4
      },
      {
        id: 3,
        name: "Gulyás csárda",
        address: "Address street 15.",
        phone: "+12 3 456 78",
        email: "csarda@email.com",
        takeaway: true,
        cardnum: 11111111111111,
        opening: 8,
        closing: 20,
        menu: this.foods,
        pricing: 3,
        rating: 4
      }
    ]
  }
}
