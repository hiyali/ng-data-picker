import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { DataPickerComponent } from 'ng-data-picker';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GenderComponent } from './gender/gender.component';
import { ProductComponent } from './product/product.component';
import { DateTimeComponent } from './date-time/date-time.component';

@NgModule({
  declarations: [
    AppComponent,
    DataPickerComponent,

    GenderComponent,
    ProductComponent,
    DateTimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
