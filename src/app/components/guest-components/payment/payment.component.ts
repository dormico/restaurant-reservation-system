import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private actRoute: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
  }

  public goToFeedback() {
    let uId;
    this.actRoute.params.subscribe(params => {
      uId = +params['id'];
    });
    this.router.navigateByUrl('/user/' + uId + '/feedback');
  }

}
