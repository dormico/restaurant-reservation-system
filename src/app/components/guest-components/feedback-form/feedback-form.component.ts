import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.type';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {

  public feedback: Feedback;
  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit() {

  }

}
