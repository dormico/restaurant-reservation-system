import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Review } from '../models/restaurant.type';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private url: string = "https://review-func-app-2.azurewebsites.net/api/"
  //private url: string = "http://localhost:7071/api/"

  constructor(private http: HttpClient,
    private config: ConfigService) { }

  public addReview(review: Review, rId: string): void {
    let activeUrl = this.url + "AddReview/" + rId;
    console.log("Calling " + activeUrl);
    let rJson = JSON.stringify(review);
    console.log("Sending the json: " + rJson);
    var oId = "0";
    this.http.post<string>(activeUrl, rJson)
      .pipe(
        catchError(this.config.handleError)
      )
      .subscribe(o => {
        oId = o;
        console.log("New review successfully added");
      });
  }
  public addAnswer(review: Review, rId: string) {
    let activeUrl = this.url + "UpdateReview/" + rId ;
    console.log("Calling " + activeUrl);
    let rJson = JSON.stringify(review);
    console.log("Sending the json: " + rJson);
    var oId = "0";
    this.http.post<string>(activeUrl, rJson)
      .pipe(
        catchError(this.config.handleError)
      )
      .subscribe(o => {
        oId = o;
        console.log("New review successfully added");
      });
  }
}
