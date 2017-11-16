import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataPickerComponent } from 'ng-data-picker';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SimpleUseComponent } from './simple-use/simple-use.component';
import { ProductComponent } from './product/product.component';
import { DateTimeComponent } from './date-time/date-time.component';

@NgModule({
  declarations: [
    AppComponent,
    DataPickerComponent,
    SimpleUseComponent,
    ProductComponent,
    DateTimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
