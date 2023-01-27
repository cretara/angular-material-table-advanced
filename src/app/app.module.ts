import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import {MatTableFilterModule} from "mat-table-filter";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        MatTableModule,
        HttpClientModule,
        MatTableFilterModule,
        MatInputModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
