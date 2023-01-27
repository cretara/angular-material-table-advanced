import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from "src/app/model/comment";
import {debounceTime, distinctUntilChanged, fromEvent, map, Observable, Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild("nameFilter")
  public nameFilterInput!: ElementRef;

  displayedColumns: string[] = ["id", "postId", "name", "email", "body"];

  commentListDataSource: MatTableDataSource<Comment> = new MatTableDataSource<Comment>();

  private nameFilterInputObservable!: Observable<Event>;
  private nameFilterInputSubscription: Subscription = new Subscription();

  constructor(private httpClient: HttpClient) {
  }

  ngOnDestroy(): void {
    this.nameFilterInputSubscription && this.nameFilterInputSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.nameFilterInputObservable = fromEvent((this.nameFilterInput.nativeElement as HTMLInputElement), "keyup");
    this.nameFilterInputSubscription = this.nameFilterInputObservable
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        map((event) => (event.target as HTMLInputElement).value)
      )
      .subscribe((nameFilterValue) => {
        console.debug("filter next", nameFilterValue);
        nameFilterValue = nameFilterValue.trim();
        nameFilterValue = nameFilterValue.toLowerCase();
        this.commentListDataSource.filter = nameFilterValue;
      })
  }

  ngOnInit(): void {
    this.httpClient
      .get<Comment[]>("https://jsonplaceholder.typicode.com/comments")
      .subscribe((commentListObservableValue) =>
        this.commentListDataSource.data = commentListObservableValue)
  }
}
