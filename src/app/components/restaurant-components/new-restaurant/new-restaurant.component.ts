import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.type';
import { RestaurantAdminService } from 'src/app/services/restaurant-admin.service';

@Component({
  selector: 'app-new-restaurant',
  templateUrl: './new-restaurant.component.html',
  styleUrls: ['./new-restaurant.component.css']
})
export class NewRestaurantComponent implements OnInit {

  constructor(private restaurantAdminService: RestaurantAdminService) { }

  ngOnInit(): void {
  }

  onSubmit(form) {
    // let restaurant: Restaurant = {
    //   "id": "0",
    //   "name": "Testaurant",
    //   "address": "French street 3.",
    //   "phone": "+12 3 456 78",
    //   "email": "fries@email.com",
    //   "takeaway": true,
    //   "tables": [],
    //   "pricing": 3,
    //   "cardnum": "11111111111111",
    //   "openingH": 8,
    //   "openingM": 8,
    //   "closingH": 20,
    //   "closingM": 20,
    //   "menu": [
    //       {
    //           "dishId": "1",
    //           "name": "Chef's special soup",
    //           "description": "In at lacus faucibus, ullamcorper metus vitae, faucibus turpis. Quisque tincidunt, arcu in consectetur blandit, sem ante eleifend dolor, a mattis neque sem ac sapien. Donec mattis efficitur nunc ut laoreet. Ut efficitur laoreet orci mattis facilisis. Vivamus volutpat massa eget mi mattis rutrum. Suspendisse eu enim lorem.",
    //           "price": 12,
    //           "image": "../assets/img/menu/specials-3.png"
    //       },
    //       {
    //           "dishId": "2",
    //           "name": "Lobster rolls",
    //           "description": "Maecenas lobortis urna sed fringilla condimentum. ",
    //           "price": 20,
    //           "image": "../assets/img/menu/lobster-roll.jpg"
    //       },
    //       {
    //           "dishId": "3",
    //           "name": "Dessert",
    //           "description": "Curabitur a eros condimentum tellus porta dictum. Nunc aliquam mattis enim. Nulla efficitur ut massa vel sollicitudin. Ut sit amet pulvinar ex.",
    //           "price": 1,
    //           "image": "../assets/img/menu/cake.jpg"
    //       },
    //       {
    //           "dishId": "4",
    //           "name": "Bread barrel",
    //           "description": "In at lacus faucibus, ullamcorper metus vitae, faucibus turpis. Quisque tincidunt, arcu in consectetur blandit, sem ante eleifend dolor, a mattis neque sem ac sapien. Donec mattis efficitur nunc ut laoreet. Ut efficitur laoreet orci mattis facilisis. Vivamus volutpat massa eget mi mattis rutrum. Suspendisse eu enim lorem.",
    //           "price": 12,
    //           "image": "../assets/img/menu/bread-barrel.jpg"
    //       },
    //       {
    //           "dishId": "5",
    //           "name": "Caesar salad",
    //           "description": "Nam eleifend ornare nunc, at convallis justo commodo id. In vitae sem aliquam erat porta consectetur in ac lacus. In maximus ullamcorper libero et molestie. Nunc dictum enim ac cursus rutrum. Curabitur in elit mi. Fusce at lectus vel augue volutpat iaculis. Curabitur nec tincidunt leo. Sed eu fringilla libero, ut semper libero. Aliquam a tincidunt elit. Phasellus sit amet elit consequat, bibendum felis non, placerat est. Vestibulum sit amet arcu sapien.",
    //           "price": 20,
    //           "image": "../assets/img/menu/caesar.jpg"
    //       },
    //       {
    //           "dishId": "6",
    //           "name": "Lobster bisque",
    //           "description": "Curabitur a eros condimentum tellus porta dictum. Nunc aliquam mattis enim. Nulla efficitur ut massa vel sollicitudin. Ut sit amet pulvinar ex.",
    //           "price": 1,
    //           "image": "../assets/img/menu/lobster-bisque.jpg"
    //       }
    //   ],
    //   "image": "../assets/img/gallery/gallery-1.jpg",
    //   "website": null,
    //   "style": "fast food",
    //   "reviews": [
    //       {
    //           "date": "2022. 01. 20.",
    //           "rating": 3,
    //           "text": "Some rating text here...",
    //           "answer": "Thank you for your review!"
    //       },
    //       {
    //           "date": "2022. 02. 11.",
    //           "rating": 5,
    //           "text": "Some rating text here...",
    //           "answer": "Proin non urna volutpat, feugiat quam viverra, sodales dui. Quisque in metus dui. Sed nunc urna, mollis nec justo at, lacinia porta neque. Sed tristique, risus vitae fringilla ornare, felis dolor sagittis dui, vel lacinia lacus sem non massa. Nullam non aliquet odio. Morbi vitae erat dui. Cras tristique lorem lectus. Nulla facilisi."
    //       },
    //       {
    //           "date": "2022. 03. 01.",
    //           "rating": 3,
    //           "text": "Nulla sapien sapien, suscipit at interdum eu, sagittis vitae enim. Integer enim ipsum, tincidunt at ullamcorper in, porta eget erat. Nunc in bibendum massa.",
    //           "answer": ""
    //       }
    //   ],
    //   "rating": 3
  //}
   // this.restaurantAdminService.addRestaurant(restaurant);
  }
}
