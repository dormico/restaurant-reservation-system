import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.type';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {

  public feedback: Feedback;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public setStars(n: number) {
    console.log("You gave a " + n + " star rating!")
  }

  public onSubmit() {
    this.router.navigateByUrl('/feedbackSubmitted');
  }

}
