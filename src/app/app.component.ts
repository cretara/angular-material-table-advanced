import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public commentList: Observable<Comment[]> = of([]);
  displayedColumns: string[] = ["id", "postId", "name", "email", "body"];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.commentList = this.httpClient
      .get<Comment[]>("https://jsonplaceholder.typicode.com/comments")
  }

  ngOnDestroy(): void {
  }

}
