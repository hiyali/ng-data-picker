import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DataPickerModule } from './data-picker/data-picker.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DataPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
