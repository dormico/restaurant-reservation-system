import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from 'src/app/models/restaurant.type';
import { CartService } from 'src/app/services/cart.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {
  public review: Review;

  constructor(private router: Router,
    private reviewService: ReviewService, 
    private cartService: CartService) {
    this.initReview();
  }

  ngOnInit(): void {
    this.initReview();
  }

  private initReview(): void {
    this.review = {
      id: "",
      date: this.today(),
      rating: 3,
      text: "",
      answer: ""
    }
  }
  private today() {
    return new Date().toISOString().split('T')[0];
  }

  private sendReview(): void{
    this.reviewService.addReview(this.review, this.cartService.restaurant.id);
  }

  public onSubmit() {
    this.sendReview();
    this.router.navigateByUrl('/feedbackSubmitted');
  }

}
