import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule, MatProgressSpinnerModule, MatButtonModule } from '@angular/material';


import { AppComponent } from './app.component';
import { OrderByPipe } from './order-by.pipe';


@NgModule({
  declarations: [
    AppComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
